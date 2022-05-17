
import { Fonts, FontSizes } from '../app/Styles';


const _styles = {
  container: RX.Styles.createViewStyle({
    flex: 1,
    backgroundColor: 'transparent',
  }),
  editTodoItem: RX.Styles.createTextInputStyle({
    margin: 8,
    width: 700,
    height: 32,
    paddingHorizontal: 4,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  editTodoItem2: RX.Styles.createTextInputStyle({
    margin: 8,
    width: 300,
    height: 32,
    paddingHorizontal: 4,
    fontSize: FontSizes.size16,
    alignSelf: 'stretch',
  }),
  buttonContainer: RX.Styles.createViewStyle({
    margin: 8,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  grid: RX.Styles.createViewStyle({
    maxWidth: 1024,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#eee"
  }),
  chart: RX.Styles.createViewStyle({
    backgroundColor: "white",
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  }),
  text1: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    color: 'white',
  }),
  text2: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'black',
  }),
  text3: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: '#9796CF',
  }),
  text4: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: 13,
    color: 'white',
  }),
  label: RX.Styles.createTextStyle({
    font: Fonts.displayBold,
    fontSize: FontSizes.size16,
    color: 'black',
  })
};

import * as RX from 'reactxp';

import * as abi from './abi';
import { useMoralis } from 'react-moralis'
import { useEffect, useMemo, useState } from 'react';

const Moralis = require('moralis');
const serverUrl = "https://soli2aousjbm.usemoralis.com:2053/server";
const appId = "EYoSle1CvNFbGig2fgrKzv5zsCcjjn2PYn8W2uWO";
Moralis.start({ serverUrl, appId });
import * as UI from '@sproutch/ui';
import _ = require('lodash');
import TodosStore from '../stores/TodosStore';
import { Todo } from '../models/TodoModels';
import CurrentUserStore from '../stores/CurrentUserStore';
export const CreateTodoHook = ({
  width,
  height,
  isTiny,
}: {
  width: number,
  height: number,
  isTiny: boolean
}) => {


  var [phase, setPhase] = useState('')
  const [cargando, setCargando] = useState(false)



  async function mintTank(val: number) {

    setCargando(true)
    setPhase('Initializing')

    await Moralis.enableWeb3()
    const currentUser = await Moralis.User.current();

    const Item = Moralis.Object.extend("Item")
    try {

      await Moralis.switchNetwork('0x4');

      await Moralis.authenticate().then(async (user: any) => {
        let username = user.get('username')
        let createdAt = user.get('createdAt')
        let sessionToken = user.get('sessionToken')
        let updatedAt = user.get('updatedAt')
        let address = user.get('ethAddress')


        let avatar = user.get('avatar')

        const items = await Moralis.Cloud.run('getAllItemsByUser', { ownerAddress: address });
        await TodosStore.setTodos(items)

        if (avatar === undefined) {


          CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
          CurrentUserStore.setLogin(true)

        } else {

          CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
          CurrentUserStore.setLogin(true)
        }

        CurrentUserStore.setCargando(false)

        const currentUser2 = await Moralis.User.current();
        if (currentUser2) {
          switch (val) {

            case 1:
              try {
                setPhase("Unboxing...")
                const options = {
                  contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                  functionName: "createItem",
                  abi: abi.tankAbi,
                  params: {
                    box: 1,
                  },
                  awaitReceipt: true,
                  msgValue: Moralis.Units.ETH("0.1")
                };
                const rec = await Moralis.executeFunction(options).then(async (receipt) => {

                  const options2 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenURI",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const metadata = await Moralis.executeFunction(options2)
                  const options3 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenRare",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const rare = await Moralis.executeFunction(options3)
                  console.log('rare ' + rare)
                  const options4 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenClass",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const classe = await Moralis.executeFunction(options4)

                  console.log('clase ' + classe)
                  let nft: Todo = {
                    token_address: '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7',
                    token_id: receipt.events.Transfer.returnValues.tokenId,
                    owner_of: currentUser.get('ethAddress'),
                    contract_type: 'ERC721',
                    name: "CryptoWarTanks",
                    symbol: "CWT",
                    class: classe,
                    rare,
                    token_uri: metadata,
                    _searchTerms: receipt.events.Transfer.returnValues.tokenId,
                  }
                  const item = new Item()
                  item.set("token_address", '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7')
                  item.set("token_id", receipt.events.Transfer.returnValues.tokenId)
                  item.set("owner_of", currentUser.get('ethAddress'))
                  item.set("contract_type", "ERC721")
                  item.set("name", "CryptoWarTanks")
                  item.set("symbol", "CWT")
                  item.set("class", classe)
                  item.set("rare", rare)
                  item.set("token_uri", metadata)

                  await item.save()
                  TodosStore.addTodo(nft)
                })

                setCargando(false)
                setPhase('')




                // do stuff here when tx has been confirmed

                break;


              } catch (error) {
                setPhase('')
                console.log('error ' + error.message)
                setCargando(false)
                break;
              }


            case 2:


              try {
                setPhase("Unboxing...")
                const options = {
                  contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                  functionName: "createItem",
                  abi: abi.tankAbi,
                  params: {
                    box: 2,
                  },
                  awaitReceipt: true,
                  msgValue: Moralis.Units.ETH("0.2")
                };
                const rec = await Moralis.executeFunction(options).then(async (receipt) => {

                  const options2 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenURI",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const metadata = await Moralis.executeFunction(options2)
                  const options3 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenRare",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const rare = await Moralis.executeFunction(options3)
                  const options4 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenClass",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const classe = await Moralis.executeFunction(options4)

                  let nft: Todo = {
                    token_address: '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7',
                    token_id: receipt.events.Transfer.returnValues.tokenId,
                    owner_of: currentUser.get('ethAddress'),
                    contract_type: 'ERC721',
                    name: "CryptoWarTanks",
                    symbol: "CWT",
                    class: classe,
                    rare,
                    token_uri: metadata,
                    _searchTerms: receipt.events.Transfer.returnValues.tokenId,
                  }
                  const item = new Item()
                  item.set("token_address", '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7')
                  item.set("token_id", receipt.events.Transfer.returnValues.tokenId)
                  item.set("owner_of", currentUser.get('ethAddress'))
                  item.set("contract_type", "ERC721")
                  item.set("name", "CryptoWarTanks")
                  item.set("symbol", "CWT")
                  item.set("class", classe)
                  item.set("rare", rare)
                  item.set("token_uri", metadata)

                  await item.save()
                  TodosStore.addTodo(nft)
                })

                setCargando(false)
                setPhase('')




                // do stuff here when tx has been confirmed

                break;


              } catch (error) {
                setPhase('')
                console.log('error ' + error.message)
                setCargando(false)
                break;
              }


            case 3:

              try {
                setPhase("Unboxing...")
                const options = {
                  contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                  functionName: "createItem",
                  abi: abi.tankAbi,
                  params: {
                    box: 3,
                  },
                  awaitReceipt: true,
                  msgValue: Moralis.Units.ETH("0.3")
                };
                const rec = await Moralis.executeFunction(options).then(async (receipt) => {

                  const options2 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenURI",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const metadata = await Moralis.executeFunction(options2)
                  const options3 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenRare",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const rare = await Moralis.executeFunction(options3)
                  const options4 = {
                    contractAddress: "0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7",
                    functionName: "tokenClass",
                    abi: abi.tankAbi,
                    params: {
                      tokenId: receipt.events.Transfer.returnValues.tokenId,
                    },
                  };
                  const classe = await Moralis.executeFunction(options4)

                  let nft: Todo = {
                    token_address: '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7',
                    token_id: receipt.events.Transfer.returnValues.tokenId,
                    owner_of: currentUser.get('ethAddress'),
                    contract_type: 'ERC721',
                    name: "CryptoWarTanks",
                    symbol: "CWT",
                    class: classe,
                    rare,
                    token_uri: metadata,
                    _searchTerms: receipt.events.Transfer.returnValues.tokenId,
                  }
                  const item = new Item()
                  item.set("token_address", '0x7950AF083F135B0baB6dC48f8AF60DA2d97Bf1c7')
                  item.set("token_id", receipt.events.Transfer.returnValues.tokenId)
                  item.set("owner_of", currentUser.get('ethAddress'))
                  item.set("contract_type", "ERC721")
                  item.set("name", "CryptoWarTanks")
                  item.set("symbol", "CWT")
                  item.set("class", classe)
                  item.set("rare", rare)
                  item.set("token_uri", metadata)

                  await item.save()
                  TodosStore.addTodo(nft)
                })

                setCargando(false)
                setPhase('')




                // do stuff here when tx has been confirmed

                break;


              } catch (error) {
                setPhase('')
                console.log('error ' + error.message)
                setCargando(false)
                break;
              }

          }

          setCargando(false)
          return;

        } else {
          console.log('error no usuario')
        }

      })
      return
    } catch {


      CurrentUserStore.setCargando(false)
      return
    }


  }

  return <RX.View style={{ height: 1000, flex: 1 }}>

    <RX.Text style={[_styles.text1, { marginLeft: 0, marginBottom: 10, marginTop: 20, alignSelf: 'center', }]} >
      {phase}
    </RX.Text>
    <RX.View style={{ flex: 1, height: 900, margin: 20, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }} >

      <RX.View style={{ flex: 33, height: 700, padding: 40, borderRadius: 12, marginRight: 10, marginLeft: 10, borderWidth: 3, borderColor: 'green' }}>
        <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={"https://ipfs.moralis.io:2053/ipfs/QmS37vxYruFJoXvDZqEDAKKCF4oVyM64wgKxiaVk4Z5qUN"} />
        <RX.Text style={[_styles.text1, { alignSelf: 'center' }]}>
          {'Buy'}
        </RX.Text>
        <UI.Button onPress={() => mintTank(1)} style={{ root: [{ marginTop: 10, height: 50, width: 150, }], content: [{ borderColor: 'green', backgroundColor: 'yellow', borderWidth: 3, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
        } elevation={4} variant={"outlined"} label="0.1 BNB" />
      </RX.View>

      <RX.View style={{ flex: 33, height: 700, padding: 40, borderRadius: 12, marginRight: 10, marginLeft: 10, borderWidth: 3, borderColor: 'purple' }}>
        <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={"https://ipfs.moralis.io:2053/ipfs/QmVzsuAY2JMTVBYzwBC97TGYUYKvBW9Aq7Ff1potn54G8n"} />
        <RX.Text style={[_styles.text1, { alignSelf: 'center' }]}>
          {'Buy'}
        </RX.Text>
        <UI.Button onPress={() => mintTank(2)} style={{ root: [{ marginTop: 10, height: 50, width: 150, }], content: [{ borderColor: 'green', backgroundColor: 'yellow', borderWidth: 3, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
        } elevation={4} variant={"outlined"} label="0.2 BNB" />
      </RX.View>

      <RX.View style={{ flex: 33, height: 700, padding: 40, borderRadius: 12, marginRight: 10, marginLeft: 10, borderWidth: 3, borderColor: 'yellow' }}>

        <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={"https://ipfs.moralis.io:2053/ipfs/QmbNekgB9edkVkquku7md7WsEhSqpxh74UsQwzKiqHEKDj"} />
        <RX.Text style={[_styles.text1, { alignSelf: 'center' }]}>
          {'Buy'}
        </RX.Text>
        <UI.Button onPress={() => mintTank(3)} style={{ root: [{ marginTop: 10, height: 50, width: 150, }], content: [{ borderColor: 'green', backgroundColor: 'yellow', borderWidth: 3, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
        } elevation={4} variant={"outlined"} label="0.3 BNB" />

      </RX.View>

    </RX.View >
  </RX.View >

}

