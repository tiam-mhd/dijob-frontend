import { Component } from '@angular/core';
import { Cafe } from '../../../shared/models/cafe';
import { CafeService } from '../../../shared/services/cafe.service';
import { AdminSharedModule } from '../../shared/admin-shared.module';

@Component({
  selector: 'app-cafe',
  imports: [AdminSharedModule],
  templateUrl: './cafe.component.html',
  styleUrl: './cafe.component.scss'
})
export class CafeComponent {
  cafe: Cafe = { id: 0 } as Cafe;

constructor(private cafeService: CafeService) {}

  ngOnInit(): void {
      this.loadCafes();
    }
  
    loadCafes() {
      this.cafeService.getByUser(4).subscribe(res => {
        this.cafe = (res.data as Cafe[])[0];
      });
    }
  
    saveCategory(cafe: Cafe) {
      if (cafe.id) {
        this.cafeService.update(cafe.id, cafe).subscribe(() => this.loadCafes());
      } else {
        this.cafeService.create(cafe).subscribe(() => this.loadCafes());
      }
    }

    selectCafe(cafe:Cafe){
      localStorage.setItem("cafeId",cafe.id.toString());
    }

    submit(){}
    reset(){}
}
