import React from 'react';

export default class ExpenseForm extends React.Component {

  constructor(props) {
    super(props);

    let defaultState = {
      categoryId: this.props.category && this.props.category.id || '',
      title: '',
      amountSpent: '',
      memo: '',
    };

    this.state = this.props.expense || defaultState;

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handler(Object.assign({}, this.state));

    this.setState({ title: '', amountSpent: '', memo: '' });
    
    if (this.props.toggle) { this.props.toggle(); }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let handleSubmit = this.state.title.length && this.state.amountSpent.length ? this.handleSubmit : null;
    let conditionalClass = this.props.classGiven ? this.props.classGiven : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} placeholder="Expense" type="text" required name="title" value={this.state.title}/>
        $ <input onChange={this.handleChange} placeholder="Amt Spent" type="number" required name="amountSpent" value={this.state.amountSpent} />
        <input onChange={this.handleChange} placeholder="Memo" type="text" name="memo" value={this.state.memo}/>
        <input onChange={this.handleChange} type="submit" />
        <div>
          <i className={`fas fa-check ${conditionalClass}`} onClick={handleSubmit}></i>
          <i className={`fas fa-plus ${conditionalClass}`} onClick={this.props.toggle}></i>
        </div>
      </form>
    );
  }
}

