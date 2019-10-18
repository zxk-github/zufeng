export type Method = 'get' | 'Get' 
| 'delete' | 'Delete'
| 'post' | 'Post'
| 'options' | 'Options'
| 'put' | 'Put'
| 'patch' | 'Patch'
export interface AxiosRequestConfig {
  url: string;
  method?: string;
  data?: any;
  param?: any

}