import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalOperations } from '../../redux/global';
import { financeSelectors, financeOperations } from '../../redux/finance';
import styles from './AddTransactionForm.module.css';

const stylesJSX = {
  primaryBtn: {
    color: '#ffffff',
    background: '#24CCA7',
    width: 300,
    height: 50,
    marginTop: '20px',
    marginBottom: '20px',
    border: 'none',
    borderRadius: '20px',
  },
  '@media screen and max-width: 700px': {
    primaryBtn: {
      width: 280,
      height: 50,
    },
  },

  secondaryBtn: {
    color: '#4A56E2',
    background: 'white',
    width: 300,
    height: 50,
    border: '1px solid #4A56E2',
    borderRadius: '20px',
  },
  '@media screen and min-width: 300px': {
    secondaryBtn: {
      width: 280,
      height: 50,
    },
  },
};

const AddTransactionForm = () => {
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [type, setType] = useState(false);
  const [amount, setAmount] = useState('');
  const categories = useSelector(financeSelectors.getAllCategories);
  // const [categoryId, setCategoryId] = useState(categories[0]._id);
  const [categoryId, setCategoryId] = useState('1111111111111');
  const [comments, setComments] = useState('');

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(globalOperations.closeModalAddTransaction());
  };

  const changeDate = e => {
    setDate(e.target.value);
  };
  const changeAmount = e => {
    setAmount(e.target.value);
  };
  const categoryChange = e => {
    setCategoryId(e.target.value);
  };
  const commentsChange = e => {
    setComments(e.target.value);
  };
  const changeType = useCallback(() => setType(!type), [type]);

  const stateType = () => {
    if (type === true) {
      return 'expense';
    }
    return 'income';
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      date,
      type: stateType(),
      categoryId,
      comments,
      amount,
    };

    dispatch(financeOperations.addTransaction(data));

    reset();
  };

  const reset = () => {
    setAmount('');
    setComments('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Добавить транзакцию</h1>
        <div className={styles.typeWrapper}>
          <span className={styles.transType}>
            <span className={styles.income}>Доход</span>
          </span>
          <label htmlFor="myToggle" className={styles.toggle}>
            <input
              name="type"
              className={styles.toggle__input}
              type="checkbox"
              value={type}
              onChange={changeType}
              id="myToggle"
            ></input>
            <div className={styles.toggle__fill}></div>
          </label>
          <span className={styles.transType}>
            <span className={styles.expense}>Расход</span>
          </span>
        </div>

        <div className={styles.categoryWrapper}>
          <select name="categoryId" className={styles.select} onChange={categoryChange}>
            {categories.map(category => (
              <option className={styles.optionFilled} key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.amountAndData__wrapper}>
          <input
            type="number"
            name="amount"
            className={styles.amountAndData}
            value={amount}
            onChange={changeAmount}
            placeholder="0.00"
            required
          />

          <input
            className={styles.amountAndData}
            type="date"
            name="date"
            value={date}
            onChange={changeDate}
          />
        </div>

        <div className={styles.textareaWrapper}>
          <input
            className={styles.text}
            name="comments"
            value={comments}
            onChange={commentsChange}
            placeholder="Комментарий"
            required
          />
        </div>
        <div className={styles.btnGroup}>
          <Button variant="primary" type="submit" style={stylesJSX.primaryBtn}>
            ДОБАВИТЬ
          </Button>

          <Button onClick={onClose} variant="primary" type="submit" style={stylesJSX.secondaryBtn}>
            ОТМЕНА
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddTransactionForm;
