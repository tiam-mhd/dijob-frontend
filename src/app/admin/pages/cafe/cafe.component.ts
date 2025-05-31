import { Component } from '@angular/core';
import { Cafe } from '../../../shared/models/cafe';
import { CafeService } from '../../../shared/services/cafe.service';

@Component({
  selector: 'app-cafe',
  imports: [],
  templateUrl: './cafe.component.html',
  styleUrl: './cafe.component.scss'
})
export class CafeComponent {
  cafe: Cafe = { id: 0 } as Cafe;

constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
      this.loadCategories();
    }
  
    loadCategories() {
      this.cafeService.getByUser(0).subscribe(data => {
        this.cafe = data;
      });
    }
  
    saveCategory(cafe: Cafe) {
      if (cafe.id) {
        this.cafeService.update(cafe.id, cafe).subscribe(() => this.loadCategories());
      } else {
        this.cafeService.create(cafe).subscribe(() => this.loadCategories());
      }
    }
}
