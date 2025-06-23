import { utilService } from "../services/util.service.js"

export function ReviewPreview({ review}) {
    const { fullname, rate, date } = review
    return (
        <React.Fragment>
                <li>{fullname}</li>
                <li>{utilService.getStars(rate)}</li>
                <li>{date}</li>
        </React.Fragment>
    )
}
