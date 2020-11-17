import * as vscode from 'vscode'
import * as actions from './services/actions'
import * as prompts from './services/prompts'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "gisto" is now active!')

  const get = vscode.commands.registerCommand('gisto.get', async () => {
    let token = context.globalState.get('GISTO_TOKEN', '')
    if (!token) {
      token = await prompts.getToken()
      if (token) context.globalState.update('GISTO_TOKEN', token)
    }
    await actions.get(token)
  })

  const create = vscode.commands.registerCommand('gisto.create', async () => {
    let token = context.globalState.get('GISTO_TOKEN', '')
    if (!token) {
      token = await prompts.getToken()
      if (token) context.globalState.update('GISTO_TOKEN', token)
    }
    await actions.create(token)
  })

  const reset = vscode.commands.registerCommand('gisto.reset', async () => {
    const token = await prompts.getToken()
    if (token) context.globalState.update('GISTO_TOKEN', token)
  })

  context.subscriptions.push(get)
  context.subscriptions.push(create)
  context.subscriptions.push(reset)
}

// this method is called when your extension is deactivated
export function deactivate() {}
