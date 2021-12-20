import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  StylesProvider,
  Chip,
  Container,
  Grid,
  Button,
  Card,
  IconButton,
} from '@material-ui/core'

import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import './PetGallery.css'
import CircularStatic from '../commons/CircularProgressWithLabel'
import { apiKey } from '../../APIKEYS'
import CustomizedInputBase from './pet-details/search/Search'

function ProjectList() {
  const [petsData, setPetsData] = useState([])
  console.log("🚀 ~ file: ProjectList.js ~ line 22 ~ ProjectList ~ petsData", petsData)
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true)

        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()

        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()

            // formats the imageURL
            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }

            data.image = await getImage(data.image)
            const info = data.description.split(',')
            data.description = info[0]
            data.category = info[1]
            data.wallet = info[2]
            data.created = cid.created.substring(0, 10)

            data.cid = cid.cid
            // data.created = cid.created
            temp.push(data)
          }
        }
        setPetsData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadPets()
  }, [])

  const handleClick = (projectId) => {
    history.push(`/project/${projectId}`)
  }

  return (
    <div style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
      {/*  Projects  */}

      {loading ? (
        <CircularStatic />
      ) : (
        <div>
          {petsData.length ? (
            petsData.map((project, index) => (
              <Card
                className="card-padding"
                onClick={() => handleClick(project.cid)}
                key={index}
              >
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <img className="nft-img" src={project.image} alt="" />
                  </Grid>

                  <Grid item xs={10}>
                    <div className="container-flex">
                      <h2 className="inner2">{project.name}</h2>
                      <p className="inner1">created : {project.created}</p>
                    </div>

                    <p className="project-description">{project.description}</p>
                    <div className="">
                      <Chip
                        size="small"
                        label={project.category}
                        color="primary"
                        clickable
                      />

                      <Chip size="small" label="Education" clickable />

                      <Chip size="small" label="App Development" clickable />

                      <Chip size="small" label="College" clickable />
                    </div>
                  </Grid>
                </Grid>
              </Card>
            ))
          ) : (
            <h2>No Ideas Yet...</h2>
          )}
        </div>
      )}

      <Card className="card-padding" onClick={handleClick}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <img
              className="nft-img"
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />
          </Grid>

          <Grid item xs={10}>
            <div className="container-flex">
              <h2 className="inner2">Online Dreams Interpretation</h2>
              <p className="inner1">created : 11-24-2021</p>
            </div>

            <p className="project-description">
              Share anonymously your dream online, and get an interpretation
              from experts depending on your cultural background and references{' '}
            </p>
            <div className="">
              <Chip size="small" label="Today" color="primary" clickable />

              <Chip size="small" label="Last Week" clickable />

              <Chip size="small" label="Last Month" clickable />

              <Chip size="small" label="All Time" clickable />
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className="card-padding">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <img
              className="nft-img"
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />
          </Grid>

          <Grid item xs={10}>
            <div className="container-flex">
              <h2 className="inner2">Online Dreams Interpretation</h2>
              <p className="inner1">created : 11-24-2021</p>
            </div>

            <p className="project-description">
              Share anonymously your dream online, and get an interpretation
              from experts depending on your cultural background and references{' '}
            </p>
            <div className="">
              <Chip size="small" label="Today" color="primary" clickable />

              <Chip size="medium" label="Last Week" clickable />

              <Chip size="medium" label="Last Month" clickable />

              <Chip size="medium" label="All Time" clickable />
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className="card-padding">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <img
              className="nft-img"
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />
          </Grid>

          <Grid item xs={10}>
            <div className="container-flex">
              <h2 className="inner2">Online Dreams Interpretation</h2>
              <p className="inner1">created : 11-24-2021</p>
            </div>

            <p className="project-description">
              Share anonymously your dream online, and get an interpretation
              from experts depending on your cultural background and references{' '}
            </p>
            <div className="">
              <Chip size="medium" label="Today" color="primary" clickable />

              <Chip size="medium" label="Last Week" clickable />

              <Chip size="medium" label="Last Month" clickable />

              <Chip size="medium" label="All Time" clickable />
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card className="card-padding">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <img
              className="nft-img"
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
              alt=""
            />
          </Grid>

          <Grid item xs={10}>
            <div className="container-flex">
              <h2 className="inner2">Online Dreams Interpretation</h2>
              <p className="inner1">created : 11-24-2021</p>
            </div>

            <p className="project-description">
              Share anonymously your dream online, and get an interpretation
              from experts depending on your cultural background and references{' '}
            </p>
            <div className="">
              <Chip size="medium" label="Today" color="primary" clickable />

              <Chip size="medium" label="Last Week" clickable />

              <Chip size="medium" label="Last Month" clickable />

              <Chip size="medium" label="All Time" clickable />
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default ProjectList
