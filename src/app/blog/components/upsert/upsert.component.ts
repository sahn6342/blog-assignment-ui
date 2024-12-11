import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-upsert',
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss'
})
export class UpsertComponent implements OnInit {
  blogForm!: FormGroup; // Reactive form for the blog
  isEdit = false; // Determines if the form is for editing
  loading = false; // Indicates loading state
  error: string | null = null; // Error message

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Check if this is an edit operation
    const blogId = this.route.snapshot.params['id'];
    if (blogId) {
      this.isEdit = true;
      this.loadBlog(blogId);
    }
  }

  initializeForm(): void {
    this.blogForm = this.fb.group({
      id: [null], // Optional for creation
      username: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(10)]],
      dateCreated: [new Date()] // Automatically set for creation
    });
  }

  loadBlog(id: number): void {
    this.loading = true;
    this.blogService.getBlog(id).subscribe({
      next: (blog) => {
        this.blogForm.patchValue(blog);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load the blog for editing.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.blogForm.invalid) return;

    const blog: Blog = this.blogForm.value;

    if (this.isEdit) {
      this.blogService.updateBlog(blog).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: () => (this.error = 'Failed to update the blog.')
      });
    } else {
      this.blogService.createBlog(blog).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: () => (this.error = 'Failed to create the blog.')
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }
}