-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Darcy User',
    "handle" VARCHAR(16) NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'http://localhost:2006/assets/default-avatar.png',
    "bio" VARCHAR(250) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPrivateData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPrivateData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" VARCHAR(280) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Followers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Following" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Likes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Reposts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "UserPrivateData_email_key" ON "UserPrivateData"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPrivateData_token_key" ON "UserPrivateData"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_Followers_AB_unique" ON "_Followers"("A", "B");

-- CreateIndex
CREATE INDEX "_Followers_B_index" ON "_Followers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Following_AB_unique" ON "_Following"("A", "B");

-- CreateIndex
CREATE INDEX "_Following_B_index" ON "_Following"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Likes_AB_unique" ON "_Likes"("A", "B");

-- CreateIndex
CREATE INDEX "_Likes_B_index" ON "_Likes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Reposts_AB_unique" ON "_Reposts"("A", "B");

-- CreateIndex
CREATE INDEX "_Reposts_B_index" ON "_Reposts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Comments_AB_unique" ON "_Comments"("A", "B");

-- CreateIndex
CREATE INDEX "_Comments_B_index" ON "_Comments"("B");

-- AddForeignKey
ALTER TABLE "UserPrivateData" ADD CONSTRAINT "UserPrivateData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Followers" ADD CONSTRAINT "_Followers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Following" ADD CONSTRAINT "_Following_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Following" ADD CONSTRAINT "_Following_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Likes" ADD CONSTRAINT "_Likes_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Likes" ADD CONSTRAINT "_Likes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Reposts" ADD CONSTRAINT "_Reposts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Reposts" ADD CONSTRAINT "_Reposts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comments" ADD CONSTRAINT "_Comments_A_fkey" FOREIGN KEY ("A") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comments" ADD CONSTRAINT "_Comments_B_fkey" FOREIGN KEY ("B") REFERENCES "PostComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
