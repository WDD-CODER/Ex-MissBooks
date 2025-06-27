import { utilService } from "../services/util.service.js"

export function ReviewPreview({ review}) {
    const { fullname, rate, readAt } = review
    
    return (
        <React.Fragment>
                <li>{fullname}</li>
                <li>{utilService.getStars(rate)}</li>
                <li>{readAt}</li>
        </React.Fragment>
    )
}
