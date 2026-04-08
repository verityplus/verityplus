-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" TEXT,
    "bioId" TEXT NOT NULL,
    "bioEn" TEXT NOT NULL,
    "bioZh" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameId" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameZh" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "borderColor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleZh" TEXT NOT NULL,
    "excerptId" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptZh" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentZh" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "coverImageCaptionId" TEXT NOT NULL,
    "coverImageCaptionEn" TEXT NOT NULL,
    "coverImageCaptionZh" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "readTimeMinutes" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "tagsId" TEXT NOT NULL,
    "tagsEn" TEXT NOT NULL,
    "tagsZh" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
