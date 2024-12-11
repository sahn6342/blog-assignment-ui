import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  blogs: Blog[] = []; // All blogs
  filteredBlogs: Blog[] = []; // Blogs after applying filters
  searchQuery: string = ''; // Search filter
  currentPage: number = 1; // Current page
  itemsPerPage: number = 5; // Blogs per page

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.filteredBlogs = [...this.blogs];
      },
      error: () => console.error('Error loading blogs')
    });
  }

  searchBlogs(): void {
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      blog.text.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
  }

  paginate(): Blog[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBlogs.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  delete(blogId: number): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(blogId).subscribe({
        next: () => {
          // Filter out the deleted blog from the current list
          alert("Blog deleted successfully.");
          this.blogs = this.blogs.filter(blog => blog.id !== blogId);
          this.filteredBlogs = [...this.blogs]; // Update filtered blogs
        },
        error: () => {
          alert('Failed to delete the blog. Please try again.');
        }
      });
    }
  }
  

  get totalPages(): number {
    return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
  }
}