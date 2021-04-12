import React from 'react';
import { useSelector} from "react-redux"
import { removeFromCart } from "../../lib/state/actions" 


const Row = ({ id, name, price, quantity}) => { 
    const removeFromCartAction = () => {};
    return (
        <tr>
            <td>
                <figure className="itemside">
                    <div className="aside"><img src={ `images/items/${id}.jpg`} className="img-sm" /></div>
                    <figcaption className="info">
                        <a href="#" className="title text-dark">{ name }</a>
                    </figcaption>
                </figure>
            </td>
            <td> 
                <select className="form-control" value={quantity} onChange={() => null}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select> 
            </td>
            <td>    
                <div className="price-wrap"> 
                    <span className="price">${price*quantity}</span> 
                </div>
            </td>
            <td className="text-right"> 
                <a data-original-title="Save to Wishlist" title="" href="" className="btn btn-light" data-toggle="tooltip" onClick={() => null}> <i className="fa fa-heart"></i></a> 
                <a href="" className="btn btn-light btn-round" onClick={removeFromCartAction}> Remove</a>
            </td>
    </tr>)
}
export default Row