import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage(key: string): any {
    const storedValue = localStorage.getItem(key);
  
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        if (Object.keys(parsedValue).length === 0 && parsedValue.constructor === Object) {
          return null;
        }
        return parsedValue;
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        return null;
      }
    }

    return null;
  }

  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
