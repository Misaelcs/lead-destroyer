import { AxiosRequestConfig } from 'axios';
import api from './api';

export class APIClient {
  private urlPrefix: string = '';
  private isLocalOnly: Boolean = true;
  private localObject: Array<Object> = [];

  constructor(urlPrefix: string) {
    this.urlPrefix = urlPrefix;
    this.isLocalOnly = import.meta.env.VITE_RUN_FRONTEND_ALONE === '1'

    if(this.isLocalOnly)
      this.localObject = JSON.parse(localStorage.getItem(urlPrefix) ?? '[]');

  }

  get<T>(id: number = -1, config?: AxiosRequestConfig): Object{
    let response;
    
    if(this.isLocalOnly) {
      response = id !== -1 ? this.localObject[id] : this.localObject
    } else {
      api.get<T>(this.urlPrefix+(id !== -1 ? '/'+id : ''), config).then(data => {
        response = data
      });
    }
    
    return response ?? [];
  }

  post<T>(data: any, config?: AxiosRequestConfig): void {
    if(this.isLocalOnly) {
      this.localObject[this.localObject.length || 0] = data;
      this.consolidateLocalStorageData();
    } else
      api.post<T>(this.urlPrefix, data, config);    
  }

  put<T>(id: number, data: any, config?: AxiosRequestConfig): void {
    if(this.isLocalOnly) {
      this.localObject[id] = data;
      this.consolidateLocalStorageData();
    } else
      api.put<T>(this.urlPrefix+'/'+id, data, config);
  }

  delete<T>(id: number, config?: AxiosRequestConfig): void {
    if(this.isLocalOnly) {
      delete this.localObject[id];
      this.consolidateLocalStorageData();
    } else
      api.delete<T>(this.urlPrefix+'/'+id, config);
  }

  consolidateLocalStorageData() {
    const _this = this;
    setTimeout(function() {
      localStorage.removeItem(_this.urlPrefix);
      localStorage.setItem(_this.urlPrefix, JSON.stringify(_this.localObject));
    }, 100)
  }
}