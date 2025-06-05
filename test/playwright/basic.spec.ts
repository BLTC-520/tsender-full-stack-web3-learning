import basicSetup from '../wallet-setup/basic.setup'
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import { anvil1Address, anvil2Address, mockTokenAddress, oneAmount } from '../test-constants'

// Set up the test environment with Synpress and MetaMask fixtures, using the basic setup configuration (basic.setup.ts)
const test = testWithSynpress(metaMaskFixtures(basicSetup)) 

const { expect } = test

test('should show mock token in token box', async ({ context, page, metamaskPage, extensionId }) => {
  // Create a new MetaMask instance with the provided context, page, password, and extension ID
  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)

  // Navigate to the root page
  await page.goto('/')

  // Click the connect button to initiate the wallet connection
  await page.getByTestId('rk-connect-button').click()
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000
  });
  await page.getByTestId('rk-wallet-option-io.metamask').click();
  await metamask.connectToDapp();

  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
    symbol: 'ETH'
  }
  await metamask.addNetwork(customNetwork)

  await page.getByRole('textbox', { name: '0x', exact: true }).waitFor({
    state: 'visible',
    timeout: 30000
  });
  await page.getByRole('textbox', { name: '0x', exact: true }).fill(mockTokenAddress);
  await page.getByRole('textbox', { name: '0x123..., 0x456...' }).fill(anvil2Address);
  await page.getByRole('textbox', { name: '200, 300...' }).fill(oneAmount);

  await page.getByText('Token Name:').waitFor({
    state: 'visible',
    timeout: 10000
  });

  await expect(page.getByText('Token Name:')).toBeVisible();
  await expect(page.getByText('Mock Token')).toBeVisible();
})

test("should show the airdrop form when connected to wallet, otherwise, not", async ({ page, context, metamaskPage, extensionId}) => {
  await page.goto('/')
  await expect(page.getByText('Please connect a wallet...')).toBeVisible();

  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId)
  await page.getByTestId('rk-connect-button').click() // go to inspect page see what is the test id
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({
    state: 'visible',
    timeout: 30000
  })
  await page.getByTestId('rk-wallet-option-io.metamask').click();
  await metamask.connectToDapp();

  // network check first 
  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.0.1:8545',
    chainId: 31337,
    symbol: 'ETH'
  }
  await metamask.addNetwork(customNetwork)

  // see the Token Address input box
  await expect(page.getByText('Token Address')).toBeVisible();
})