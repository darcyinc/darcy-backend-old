package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/darcyinc/darcy/cdn/handlers"
)

// rateLimiter is a struct that contains a mutex and a map of IP addresses
// to slices of timestamps.
type rateLimiter struct {
	sync.Mutex
	requests map[string][]time.Time
}

// allowIP checks if the IP address has made too many requests within the
// given time period and returns false if the rate limit has been exceeded.
func (rl *rateLimiter) allowIP(key string, limit int, duration time.Duration) bool {
	rl.Lock()
	defer rl.Unlock()

	// If the IP address has not made any requests yet, initialize an empty slice
	// in the requests map.
	if _, ok := rl.requests[key]; !ok {
		rl.requests[key] = make([]time.Time, 0, limit)
	}

	// Remove any old timestamps from the slice.
	for len(rl.requests[key]) > 0 && time.Since(rl.requests[key][0]) > duration {
		rl.requests[key] = rl.requests[key][1:]
	}

	// Check if the number of requests is within the limit.
	if len(rl.requests[key]) >= limit {
		return false
	}

	// Add the current timestamp to the requests slice.
	rl.requests[key] = append(rl.requests[key], time.Now())

	return true
}

func main() {
	// Create a rate limiter for /upload.
	uploadLimiter := &rateLimiter{requests: make(map[string][]time.Time)}

	// Create a rate limiter for /assets/*.
	assetsLimiter := &rateLimiter{requests: make(map[string][]time.Time)}

	// Define the handlers with rate limiting middleware.
	uploadHandler := func(w http.ResponseWriter, r *http.Request) {
		// Check if the IP address has exceeded the rate limit for /upload.
		if !uploadLimiter.allowIP(r.RemoteAddr, 5, time.Minute) {
			http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		// Call the UploadHandler function from the handlers package.
		handlers.UploadHandler(w, r)
	}

	serveHandler := func(w http.ResponseWriter, r *http.Request) {
		// Check if the IP address has exceeded the rate limit for /assets/*.
		if !assetsLimiter.allowIP(r.RemoteAddr, 10, 10*time.Second) {
			http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		// Call the ServeHandler function from the handlers package.
		handlers.ServeHandler(w, r)
	}

	// Register the handlers with the server.
	http.HandleFunc("/upload", uploadHandler)
	http.HandleFunc("/assets/", serveHandler)

	// Create the folder /assets if it doesn't exist.
	os.Mkdir("assets", 0755)

	// Start the server.
	srv := &http.Server{
		Addr:         ":2006",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	fmt.Println("[CDN] Listening on port 2006")

	log.Fatal(srv.ListenAndServe())
}
