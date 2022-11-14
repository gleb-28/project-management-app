import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by-pipe/filter-by.pipe';
import { BoardsRoutingModule } from './boards-routing.module';

@NgModule({
	declarations: [FilterByPipe],
	imports: [CommonModule, BoardsRoutingModule],
	providers: [FilterByPipe],
})
export class BoardsModule {}
