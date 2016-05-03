import React from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import { actions as MDEActions } from '../../redux/modules/mde';
import classes from './MarkDownEditor.scss';

class MarkDownEditor extends React.Component {
  constructor() {
    super();
  }

  //componentDidMount() {
  //  const { updateContent } = this.props
  //
  //  }
  //
  //  simplemde.codemirror.on('change', function(){
  //    updateContent(simplemde.value())
  //  })
  //
  //  updateContent(simplemde.value())
  //}
  //
  //componentWillUnmount() {
  //  const { clearContent } = this.props
  //  clearContent()
  //}

  handleEditorChange(e) {
    this.setState({
      content: e.target.getContent()
    });
  }

  render() {
    return (
      < div >
      < TinyMCE
        content = "<h1 style='width:auto;display:inline-block'>Blog Title Here</h1>"
        config = {{
            inline: true,
            height: 500,
            width: 300,
            toolbar: 'undo redo',
            menubar: false,
            setup: (ed) => {
              ed.on('keydown', (e) => {
                if (e.keyCode == 13) {
                  e.preventDefault();
                }
                if (e.currentTarget.innerText.length > 20) {
                  e.preventDefault();
                }
              });
          }}
        }
      />
      < TinyMCE
        content = "<p className='editable'>This is the blog body!</p>"
        config = {{
            inline: true,
            plugins: 'autolink link image lists print preview',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
          }}
          onChange = {this.handleEditorChange.bind(this)
        }
      />
    </div >
  )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MarkDownEditor)
