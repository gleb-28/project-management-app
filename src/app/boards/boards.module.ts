import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by-pipe/filter-by.pipe';

@NgModule({
	declarations: [FilterByPipe],
	imports: [CommonModule],
	providers: [FilterByPipe],
})
export class BoardsModule {}
