import * as vscode from 'vscode'
import { Gists } from '@/services/gist/gist.types'

export const getToken = async () => {
  const options: vscode.InputBoxOptions = {
    prompt: '🧙‍♀️ gisto',
    placeHolder: 'Enter your github token here...'
  }
  const token = await vscode.window.showInputBox(options)
  return token || ''
}

export const gistName = async () => {
  const options: vscode.InputBoxOptions = {
    prompt: '🧙‍♀️ gisto',
    placeHolder: 'Enter the name of your gist...'
  }
  const name = await vscode.window.showInputBox(options)
  return name || ''
}

export const search = async () => {
  const options: vscode.InputBoxOptions = {
    prompt: '🧙‍♀️ gisto',
    placeHolder: 'Enter a search term for gisto...'
  }
  const searchTerm = await vscode.window.showInputBox(options)
  return searchTerm
}

export const getGist = async (
  choices: Array<vscode.QuickPickItem>,
  gists: Array<Gists.Gist>
) => {
  const choice = await vscode.window.showQuickPick(choices, {
    placeHolder: 'Choose a gist to copy to the clipboard:'
  })
  if (!choice) return
  const index = choices.indexOf(choice)
  return gists[index]
}
