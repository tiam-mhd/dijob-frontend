import { Component } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';

@Component({
  selector: 'app-item-form',
    standalone: true,
    imports: [AdminSharedModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent {

}
