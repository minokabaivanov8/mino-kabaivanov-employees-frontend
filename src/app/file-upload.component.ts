import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  displayedColumns: string[] = ['employeeId1', 'employeeId2', 'projectId', 'daysWorked'];
  dataSource = new MatTableDataSource<any>();

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.http.post<any>('http://localhost:8080/api/employee-project', formData).subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error uploading file: ', error);
      }
    );
  }
}
