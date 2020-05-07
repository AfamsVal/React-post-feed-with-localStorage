import React, { Component } from "react";
import Contents from "./Contents";
import { v4 as uuidv4 } from "uuid";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      post: "",
      date: new Date().getTime(),
      error: {},
      success: false,
      contents: [],
      isLoading: false,
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.getItem = localStorage.getItem("contents");
    if (this.getItem === null) {
      localStorage.setItem("contents", "[]");
    }
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem("contents"));
    this.setState({ ...this.state, contents: [...items] });
  }

  onSubmitPost(e) {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });
    setTimeout(() => {
      const { title, post, date } = this.state;
      if (title.trim().length === 0) {
        this.setState({
          ...this.state,
          error: { title: "Title is required" },
        });
        return;
      } else if (title.trim().length > 25) {
        this.setState({
          ...this.state,
          error: { title: "Maximum of 20 character is required" },
        });
        return;
      }

      if (post.trim().length === 0) {
        this.setState({
          ...this.state,
          error: { post: "Post is required" },
        });
        return;
      }

      const content = {
        id: uuidv4(),
        title,
        post,
        date,
      };

      const store = JSON.parse(localStorage.getItem("contents"));
      const newItem = [content, ...store];
      localStorage.setItem("contents", JSON.stringify(newItem));
      this.setState({
        ...this.state,
        title: "",
        post: "",
        error: {},
        success: true,
        contents: [content, ...this.state.contents],
      });
    }, 1000);
    setTimeout(
      () => this.setState({ ...this.state, success: false, isLoading: false }),
      3000
    );
  }

  onChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.value);
  }

  deleteHandled(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      let contents = JSON.parse(localStorage.getItem("contents"));
      contents = contents.filter((content) => content.id !== id);
      localStorage.setItem("contents", JSON.stringify(contents));
      this.setState({ ...this.state, contents });
    }
  }

  editHandle = (id) => {
    //console.log(id);
  };

  updatedItem = () => {
    let contents = localStorage.getItem("contents");
    if (contents.length >= 0) {
      contents = JSON.parse(contents);
      this.setState({ ...this.state, contents });
    }
  };

  render() {
    const myStyle = { background: "#eee", paddingTop: "10px" };
    const titleClass = this.state.error.title
      ? "form-control is-invalid"
      : "form-control";
    const postClass = this.state.error.post
      ? "form-control is-invalid"
      : "form-control";

    return (
      <div className="col-md-12" style={myStyle}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="text-info text-center my-3">
              PUBLISH NEW CONTENT TODAY...
            </h3>
            <form onSubmit={this.onSubmitPost}>
              <div className="form-group">
                {this.state.error.title && (
                  <label className="text-center" style={{ color: "red" }}>
                    {this.state.error.title}**
                  </label>
                )}

                {this.state.error.post && (
                  <label className="text-center" style={{ color: "red" }}>
                    {this.state.error.post}**
                  </label>
                )}
                {this.state.success && (
                  <div className="card bg-info text-white mb-1">
                    <div className="card-body py-1">
                      <i className="fas fa fa-check-circle"></i> Posted
                      Success!!
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={this.state.title}
                  onChange={this.onChangeInput}
                  className={titleClass}
                  placeholder="Enter Title..."
                />
              </div>
              <div className="form-group">
                <textarea
                  className={postClass}
                  placeholder="Enter new post..."
                  rows="5"
                  value={this.state.post}
                  onChange={this.onChangeInput}
                  name="post"
                ></textarea>
              </div>
              <button className="btn btn-lg btn-info" type="submit">
                {this.state.isLoading ? (
                  <i className="fas fa fa-spin fa-spinner"></i>
                ) : (
                  <i className="fas fa fa-plus"></i>
                )}{" "}
                Post New Item
              </button>
            </form>
          </div>
        </div>

        {
          //Display of post contents below
        }
        <div className="row my-5">
          <div className="col-md-12">
            <hr />
          </div>
          <Contents
            items={this.state.contents}
            editHandle={(id) => this.editHandle(id)}
            deleteHandle={(id) => this.deleteHandled(id)}
            updatedItem={() => this.updatedItem()}
          />
        </div>
      </div>
    );
  }
}
export default Dashboard;
