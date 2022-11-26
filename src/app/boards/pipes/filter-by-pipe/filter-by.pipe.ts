import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
	transform<T>(items: T[] | null, property: string, filterValue: string): T[] {
		if (!items?.length || !filterValue) return items || [];
		if (items.some((item) => !item[property as keyof T])) return items;

		return items.filter((item) =>
			String(item[property as keyof T])
				.toLowerCase()
				.includes(filterValue.trim().toLowerCase()),
		);
	}
}
