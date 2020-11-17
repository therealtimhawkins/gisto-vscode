import axios from 'axios'
import moment from 'moment'
import { Gists } from './gist.types'

const createDiscription = (name: string) => {
  return `gisto:${moment().format('DD/MM/YYYY')}: ${name}`
}

export const create = async (name: string, content: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `token ${token}`
      }
    }

    const files: Gists.Files = {}
    files[name] = { content }
    const description = createDiscription(name)

    const { data } = await axios.post(
      'https://api.github.com/gists',
      {
        description,
        public: true,
        files
      },
      config
    )

    return data.html_url
  } catch (err) {
    console.log(err)
    return {}
  }
}

const isGisto = (gist: Gists.Gist) => {
  return gist.description.includes('gisto:')
}

const isSearched = (gist: Gists.Gist, term: string) => {
  return JSON.stringify(gist).includes(term)
}

export const getAll = async (term: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `token ${token}`
      }
    }

    const { data } = await axios.get('https://api.github.com/gists', config)

    const gists = data.filter((gist: Gists.Gist) => {
      return isGisto(gist) && isSearched(gist, term)
    })
    const descriptions = gists.map((gist: Gists.Gist) => {
      return gist.description
    })

    return { gists, descriptions }
  } catch (err) {
    console.log(err)
    return { descriptions: [], gists: [] }
  }
}

export const getContent = async (gist: Gists.Gist) => {
  try {
    const keys = Object.keys(gist.files)
    const url = gist.files[keys[0]].raw_url
    if (url) {
      const { data } = await axios.get(url)
      return data
    }
    return
  } catch (err) {
    console.log(err)
    return {}
  }
}
