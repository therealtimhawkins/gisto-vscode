export declare namespace Gists {
  export interface Files {
    [key: string]: File
  }

  export interface File {
    content: string
    raw_url?: string | undefined
  }

  export interface Owner {
    html_url: string
  }

  export interface Gist {
    description: string
    files: Files
    owner: Owner
    html_url: string
  }
}
