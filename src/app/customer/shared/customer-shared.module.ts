import { NgModule } from '@angular/core';

import { CoreSharedModule } from '../../shared/core-shared.module';

/* CoreUI Modules */
import {
  AccordionModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ModalModule,
  NavModule,
  ProgressModule,
  SidebarModule,
  SpinnerModule,
  TabsModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule,
} from '@coreui/angular';

@NgModule({
  imports: [
    CoreSharedModule,

    /* CoreUI Modules */
    AccordionModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    HeaderModule,
    ModalModule,
    NavModule,
    ProgressModule,
    SidebarModule,
    SpinnerModule,
    TabsModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule,
    
  ],
  exports: [
    CoreSharedModule,

    /* CoreUI Modules */
    AccordionModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    HeaderModule,
    ModalModule,
    NavModule,
    ProgressModule,
    SidebarModule,
    SpinnerModule,
    TabsModule,
    ToastModule,
    TooltipModule,
    UtilitiesModule,
  ]
})
export class CustomerSharedModule {}
