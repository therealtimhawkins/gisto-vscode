import * as vscode from 'vscode'
import * as clipboardy from 'clipboardy'
import * as prompts from '../../prompts'
import * as gist from '../../gist'

const create = async (token: string) => {
  const name = await prompts.gistName()
  const clipboard = clipboardy.readSync()
  const gistUrl = await gist.create(name, clipboard, token)
  if (gistUrl) {
    clipboardy.writeSync(gistUrl)
    vscode.window.showInformationMessage(
      `🧙‍♀️ gisto created gist at ${gistUrl}! Copied the link to clipboard.`
    )
  }
}

export default create
