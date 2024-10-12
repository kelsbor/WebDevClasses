# Lab64
**Testing**
- Index: curl -i -s http://localhost:3000
- About: curl -i -s http://localhost:3000/about
- Upload: curl -X POST -d "file=/pathtofile/file.txt" http://localhost:3000/upload (This just simulates the upload of a file, returning that the file was uploaded)