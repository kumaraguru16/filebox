const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

const maxFileSize = 10 * 1024 * 1024;

// Function to validate file size
function validateFileSize(file: any): void {
  if (file.size > maxFileSize) {
    throw new Error(
      `File size exceeds the maximum allowed limit of 10MB: ${file.name}`
    );
  }
}

// Function to validate file type
function validateFileType(mimeType: string): void {
  if (!allowedMimeTypes.includes(mimeType)) {
    throw new Error(
      `Invalid file type. Only PDF, JPG, and PNG files are allowed.`
    );
  }
}

export { validateFileSize, validateFileType };
