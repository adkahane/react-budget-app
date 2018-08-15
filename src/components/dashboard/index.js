import React from 'react';
import {connect} from 'react-redux';

import { categoryCreate, categoryUpdate, categoryDestroy } from '../../app/actions/categories.js';
import { expenseCreate, expenseDestroy, expenseUpdate } from '../../app/actions/expenses.js';

import CategoryForm from '../category-form';
import CategoryItem from '../category-item/index.js';
import ExpenseForm from '../expense-form/index.js';
import ExpenseItem from '../expense-item/index.js';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expenseKey: null,
    };
  }

  componentDidUpdate() {
    console.log('__DASHBOARD__STATE', this.state);
  }

  setExpenseFocus = () => {
    console.log("DO WE GET HERE");
    let expenseKey = this.props.categories[this.props.categories.length - 1].id;
    this.setState({ expenseKey });
  } 

  handleCategoryClick = (e) => {
    let targetIndex = e.target.dataset.index;
    console.log('TARGET', targetIndex);
    if (this.state.expenseKey !== targetIndex && targetIndex !== undefined) {
      this.setState({expenseKey: targetIndex});
    }
  }

  render() {
    let category = this.props.categories.filter(category => category.id === this.state.expenseKey)[0];
    return (
      <React.Fragment>
        <section className="dashboard">
          <div className="category-form">
            <h2>Add a New Budget Category</h2>
            <CategoryForm handler={this.props.handleCreateCategory} setExpenseFocus={this.setExpenseFocus} />
          </div>
          <div className="budget-content">
            <div className="expense-categories">
              {
                this.props.categories.map((category, i) => 
                  <div key={i} data-index={category.id} className="category" onClick={(e) => this.handleCategoryClick(e)}>
                    <CategoryItem 
                      key={i} 
                      category={category}
                      expenses={this.props.expenses}
                      handleUpdate={this.props.handleUpdateCategory}
                      handleDestroy={this.props.handleDestroyCategory}
                    /> 
                  </div>)
              }
            </div>
            <div className="expense-items">
              { category ? 
                <div key={category.id} data-index={category.id} className="category-expenses">
                  <div className="expense-form">
                    <h4>Add An Expense Item: </h4>
                    <ExpenseForm handler={this.props.handleCreateExpense} category={category} />
                  </div>
                  <div className="expense-list">
                    {
                      this.props.expenses[category.id].map((expense, i) =>
                        <div key={i} className="expense-item">
                          <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            handleUpdate={this.props.handleUpdateExpense}
                            handleDestory={this.props.handleDestroyExpense}
                            updateBudget={this.handleBudgetChange}
                          />
                        </div>)
                    }
                  </div>
                </div>
                : null
              }
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  categories: state.categories,
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleCreateCategory: category => dispatch(categoryCreate(category)),
  handleUpdateCategory: category => dispatch(categoryUpdate(category)),
  handleDestroyCategory: category => dispatch(categoryDestroy(category)),
  handleCreateExpense: expense => dispatch(expenseCreate(expense)),
  handleUpdateExpense: expense => dispatch(expenseUpdate(expense)),
  handleDestroyExpense: expense => dispatch(expenseDestroy(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);