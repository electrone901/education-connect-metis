import React, { useState, useEffect } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './RegisterCommunity.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../../../APIKEYS'

// import { providers } from 'ethers'
// import { init } from '@textile/eth-storage'

function RegisterCommunity({ account, contractData }) {
  const history = useHistory()
  const petTypeRef = React.createRef()
  const [projectType, setProjectType] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [PhysicalAddress, setPhysicalAddress] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  useEffect(() => {
    console.log('contractData', contractData)
    const loadCommunity = async () => {
      try {
        // pass the cid
        const cid = 'QmTFaLUesrjbQLKxNszz2DWZ33N9YuGBSVCLpwXnvyiumz'

        let fileData = await fetch(`https://ipfs.io/ipfs/${cid}`)

        const yourData = await fileData.json()
        console.log(yourData)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommunity()

    //
    const getCommunityList = async () => {
      try {
        // gets communityCount from chain
        const count = await contractData.methods.count().call()
        console.log('count', count)

        // gets community data
        const temp = []
        for (let i = count; i >= 1; i--) {
          const community = await contractData.methods.communityList(i).call()
          temp.push(community)
        }
        console.log(temp)

        // setCommunities(temp)
      } catch (error) {
        console.log(error)
        // setLoading(false)
      }
    }
    getCommunityList()
    //
  }, [])

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    console.log(imageName, imageType)
  }

  // const saveToTextile = async () => {
  //   try {
  //     // connects to ethereum & web3
  //     await window.ethereum.enable()
  //     const provider = new providers.Web3Provider(window.ethereum)
  //     const wallet = provider.getSigner()
  //     // const storage = await init(wallet)

  //     // creates a file to save data
  //     const communityImage = new Blob([image], { type: 'text/plain' })
  //     const file = new File([communityImage], 'community.txt', {
  //       type: 'text/plain',
  //       lastModified: new Date().getTime(),
  //     })

  //     // await storage.addDeposit()
  //     const { cid } = await storage.store(file)
  //     let formattedCid = cid['/']
  //     return formattedCid
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const saveToNFTStorage = async () => {
    console.log(
      'all info',
      description,
      image,
      projectType,
      walletAddress,
      name,
    )

    try {
      const client = new NFTStorage({ token: apiKey })
      const data = await client.store({
        name: name,
        description: `${description}, ${projectType}, ${walletAddress}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (data) {
        let imgPath = data.data.image.pathname
        imgPath = imgPath.substring(2)
        const nftStorageImgPath = `https://ipfs.io/ipfs/${imgPath}`
        return nftStorageImgPath
      }
    } catch (error) {
      console.log(error)
    }
  }

  const saveToChain = async (event) => {
    event.preventDefault()

    const imageFromnftStorage = await saveToNFTStorage()
    console.log(
      '🚀 ~ file: RegisterCommunity.js ~ line 129 ~ saveToChain ~ imageFromnftStorage',
      imageFromnftStorage,
    )

    // try {
    //   // save image to nftStorage, get the imageURL then save imgURL and data to chain using the contract
    //   // let imageFromnftStorage =
    //   //   'https://ipfs.io/ipfs/bafybeidil6m4cb6ik3wcuncu3hck5umcythl67ten4ujw7zf6wujpuwnna/bro_vector_adobestock_329020800_2.jpg'

    //   let imageFromnftStorage =
    //     'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    //   let name = 'first Project'
    //   let description = 'This is my dream Project'
    //   let PhysicalAddress = 'Adress'
    //   let walletAddress = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'

    //   const req = await contractData.methods
    //     .registerCommunity(
    //       imageFromnftStorage,
    //       name,
    //       description,
    //       PhysicalAddress,
    //       walletAddress,
    //     )
    //     .send({ from: account })
    //   console.log(
    //     '🚀 ~ file: RegisterCommunity.js ~ line 122 ~ saveToChain ~ req',
    //     req,
    //   )
    // } catch (err) {
    //   console.error(err)
    // }
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Register Your Awesome Idea
          </Typography>

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              {/* Community image */}
              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={handleImage}
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {/* Community image */}

              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className="text-field"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="description"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Digital Wallet Address"
                variant="outlined"
                className="text-field"
                defaultValue={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />

              <TextField
                fullWidth
                name="petType"
                select
                label="Choose one option"
                variant="outlined"
                className="text-field"
                onChange={(e) => setProjectType(e.target.value)}
                defaultValue=""
                ref={petTypeRef}
              >
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Social Good">Social Good</MenuItem>
                <MenuItem value="App Development">App Development</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={saveToChain}
              >
                Submit
              </Button>
            </form>
          </div>
          {/* <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={saveToTextile}
          >
            getList
          </Button> */}
        </div>
      </Container>
    </StylesProvider>
  )
}

export default RegisterCommunity
