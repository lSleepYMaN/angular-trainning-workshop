import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  service_url = 'https://669333ccc6be000fa07a0296.mockapi.io/todo/v1/topic'
  topics:any = []

  constructor(private http: HttpClient, private router: Router) {

    this.loadTopic()

  }

  topic = new FormControl('')

  loadTopic() {
    this.http.get(this.service_url).subscribe({
      next:(result) => {
        this.topics = result
      }
    })
  }

  onSelectTopic(id: number) {
    console.log(id)
    this.router.navigate(['/list',id])
  }

  onAddTopic() {
    let body = {
      "topic" : this.topic.value
    }
    this.http.post(this.service_url, body).subscribe({
      next:(result) => {
        console.log(result)
        this.loadTopic()
      }
    })
  }

  onRemoveTopic(id: number) {
    console.log(id)

    this.http.delete(`${this.service_url}/${id}`).subscribe(
      {
        next: (result) => {
          console.log(result)
          this.loadTopic()
        },
        error: (err) => {
          console.log(err.error)
          this.loadTopic()
          alert(`${id} ${err.error}`)
        }
      }
    )
  }

}
