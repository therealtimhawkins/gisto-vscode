import * as vscode from 'vscode'
import clipboardy from 'clipboardy'
import * as prompts from '../../prompts'
import { getAll, getContent } from '../../gist'

const get = async (token: string) => {
  const term = await prompts.search()
  if (!term) return
  const { descriptions, gists } = await getAll(term, token)
  if (gists.length) {
    const gist = await prompts.getGist(descriptions, gists)
    if (!gist) return
    const data = await getContent(gist)
    if (!data) return
    clipboardy.writeSync(data)
    vscode.window.showInformationMessage(
      `🧙‍♀️ gisto copied the gist to your clipboard!`
    )
  }
}

export default get
