import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.html',
    // template: '<h1>Test Home Works</h1>',
    styleUrls: ['./home.css'],
})
export class HomeComponent {
    title = 'mean-project';
}
