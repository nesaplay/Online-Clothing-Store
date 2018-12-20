import Link from 'next/link'
import SingleItem from '../components/SingleItem'

const Item = props => (
  <div>
    <SingleItem id={props.query.id} />
  </div>
)

export default Item