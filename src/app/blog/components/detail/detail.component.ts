import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  blog?: Blog; // Holds the blog details
  loading = true; // Loading indicator
  error: string | null = null; // Error message

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.params['id']; // Get blog ID from route
    if (blogId) {
      this.loadBlogDetails(blogId);
    } else {
      this.error = 'Invalid Blog ID';
      this.loading = false;
    }
  }

  loadBlogDetails(id: number): void {
    this.blogService.getBlog(id).subscribe({
      next: (data) => {
        this.blog = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load the blog details.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }
}
