/**
 *
 * InputJSON
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-night.css';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import {Wrapper, Switch} from './components';
import axios from "axios"

const bucketName = "newmagazine"
const imageUrl= "http://localhost:1337/posts/findImageInformation/"
const imageInfoURL = "http://localhost:1337/posts/getImageFromGoogle"
class InputJSON extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images:[], multiple:false, selectedImages:[]};
  }

  async componentWillMount() {
    const {items: images} = await this.loadImages()
    this.setState({images})
  }

  changeImageType = async () =>{
    const currentState = this.state.multiple 
    this.setState({multiple: !currentState? true: false, selectedImages:[]})
    const {name, onChange}= this.props
    const value = {}
    onChange({
      target:{
        name,
        value
      }
    })
  }

  loadImages = async() =>{
    const images = await axios({
      method: "get",
      url: imageInfoURL,
    })
    return images.data
  }

  updateImageObject = async (image, multipleImages) =>{
    let hash
    if(!multipleImages){
      hash = image.src.split(".images/")[1].split(".")[0] 
      const {data: imageInfo} = await axios.get(`${imageUrl}${hash}`)
      if(imageInfo.length > 0){
        image.title = imageInfo[0].title,
        image.description = imageInfo[0].description,
        image.tableId = imageInfo[0].id
      }
  
    } else {
      image.forEach( async img =>{
        hash = img.src.split(".images/")[1].split(".")[0];
        const {data: imageInfo} = await axios.get(`${imageUrl}${hash}`)
        if(imageInfo.length > 0){
          img.title = imageInfo[0].title,
          img.description = imageInfo[0].description,
          img.tableId = imageInfo[0].id
        }
      })
    }
    return image
  }



  onPick = async (image) =>{
    try {
      const {name, onChange} = this.props
      const value = await this.updateImageObject(image, this.state.multiple)
      onChange({
        target: {
          name,
          value,
          type: 'json',
        },
      });
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Wrapper>
        <Switch>
          <label className="form-switch">
              <h3>Single Image</h3>
              <input type="checkbox"  onClick={this.changeImageType}/>
              <i></i>
              <h3>Multiple Image</h3>
          </label>
        </Switch>
        <ImagePicker 
          images={this.state.images.map((image, i) => ({src: `https://storage.cloud.google.com/${bucketName}/${image.name}`, value:i}))}
          onPick={this.onPick}
          multiple = {this.state.multiple}
          picked = {null} 
        />
      </Wrapper>
    );
  }
}

InputJSON.defaultProps = {
  disabled: false,
  onBlur: () => {},
  onChange: () => {},
  value: null,
};

InputJSON.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default InputJSON;
