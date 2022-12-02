import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	public set(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	public get<T>(key: string): T | null {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : null;
	}

	public remove(key: string): void {
		localStorage.removeItem(key);
	}

	public clear(): void {
		localStorage.clear();
	}
}
