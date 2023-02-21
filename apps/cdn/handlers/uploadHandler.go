package handlers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/darcyinc/darcy/cdn/utils"
)

const (
	MaxFileSize = 50 * 1024 * 1024 // 50 MB
	UploadPath  = "./assets"
)

func UploadHandler(w http.ResponseWriter, r *http.Request) {
	// only accept POST requests
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// decode JSON payload into a struct
	var data struct {
		Data string `json:"data"`
		Ext  string `json:"ext"`
	}
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// check if required fields are present
	if data.Data == "" || data.Ext == "" {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// decode base64-encoded file data
	fileData, err := base64.StdEncoding.DecodeString(data.Data)
	if err != nil {
		http.Error(w, "Invalid file data", http.StatusBadRequest)
		return
	}

	// check if file size exceeds maximum allowed size
	if len(fileData) > MaxFileSize {
		http.Error(w, "File too large", http.StatusBadRequest)
		return
	}

	// generate unique ID and file path
	id := utils.RandomString(32)
	ext := "." + data.Ext
	filePath := filepath.Join(UploadPath, id+ext)

	// save file to disk
	if err := os.WriteFile(filePath, fileData, 0644); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// construct URL to uploaded file
	url := fmt.Sprintf("http://%s/assets/%s%s", r.Host, id, ext)

	// construct and send JSON response
	jsonResponse := map[string]string{"url": url}
	jsonBytes, err := json.Marshal(jsonResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)

	// log file upload information
	fmt.Printf("Uploaded file: %s, Size: %d bytes\n", filePath, len(fileData))
}
