import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sortByPipe',
})
export class SortByPipePipe implements PipeTransform {

	transform<T>(array: Array<T>, field: keyof T): Array<T> {
		if (!Array.isArray(array)) {
			return [];
		}

		if (array?.length <= 1) {
			return array;
		}

		return array.sort((a: T, b: T) => {
			return Number(a[field]) - Number(b[field]);
		});
	}
}
