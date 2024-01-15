import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [DatePipe, NewsService],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('300ms', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  cardAnimationState: string = 'visible';
  articles: any[] = [];
  searchQuery: string = '';
  selectedCountry: string = 'Select Country';
  isIndiaDropdownOpen: boolean = false;
  isUsDropdownOpen:boolean=false;
  isenglandDropdownOpen:boolean=false;
  ispakDropdownOpen:boolean=false
  isausDropdownOpen:boolean=false
  iscanadaDropdownOpen:boolean=false
  curSelectedNav: HTMLElement | null = null;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews('World');
  }

  fetchNews(query: string): void {
    this.newsService.getNews(query).subscribe(
      (data: any) => {
        this.articles = data.articles;
      },
      (error) => {
        console.log('Error fetching news')
      },

    );
  }

  openArticle(url: string): void {
    window.open(url, '_blank');
  }

  onNavItemClick(id: string): void {
    this.fetchNews(id);
    if (this.curSelectedNav) {
      this.curSelectedNav.classList.remove('active');
    }
    this.curSelectedNav = document.getElementById(id);
    if (this.curSelectedNav) {
      this.curSelectedNav.classList.add('active');
    }
  }

  onSearchClick(query: string): void {
    if (!query) return;
    this.fetchNews(query);
    if (this.curSelectedNav) {
      this.curSelectedNav.classList.remove('active');
      this.curSelectedNav = null;
    }
  }

  onCountrySelect(country: string): void {
    this.selectedCountry = country;
    this.fetchNews(country);
    if (this.curSelectedNav) {
      this.curSelectedNav.classList.remove('active');
    }
  }
  toggleNestedDropdown(dropdownType: string): void {
    if (dropdownType === 'india') {
      this.isIndiaDropdownOpen = !this.isIndiaDropdownOpen;
      this.isUsDropdownOpen = false; 
    } else if (dropdownType === 'us') {
      this.isUsDropdownOpen = !this.isUsDropdownOpen;
  }else if(dropdownType==='england'){
    this.isenglandDropdownOpen= !this.isenglandDropdownOpen;

  }else if (dropdownType ==='pakistan'){
    this.ispakDropdownOpen=!this.ispakDropdownOpen;
   
  }else if(dropdownType==='australia'){
    this.isausDropdownOpen=!this.isausDropdownOpen;
      }else if(dropdownType==='canada'){
        this.iscanadaDropdownOpen=!this.iscanadaDropdownOpen
      }
  }
}
