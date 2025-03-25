import React from 'react'
import { Link } from 'react-router'

export default function Category() {
    const categories = [
        { id: 1, name: "Legal", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/3e725023e4c44df35608222dee97bd44.png" },
        { id: 2, name: "Tax", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/d99c14ba9fc23337e435d36a4ccd46c1.png" },
        { id: 3, name: "Human Resources", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/7f4695636960e146c915b1490d296324.png" },
        { id: 4, name: "Accountancy and Finance", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/985db3dcfd9a1a3173c34257d7873daf.png" },
        { id: 5, name: "Financial Services and Insurance", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/a60ea0ce2d74029a94d74bbd4eba08ea.png" },
        { id: 6, name: "Technology and IT", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/05225099e80ca952df1198a3a28169fe.png" },
        { id: 7, name: "Banking", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/56aa7e9d549302a87cc8758977fe6ea2.png" },
        { id: 8, name: "Compliance", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/29f13381471fc463109fd71862c00c65.png" },
        { id: 9, name: "Business Services", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/b68fc45c41320aa5460177c7a64e5afa.png" },
        { id: 10, name: "Engineering", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/4f29082c9e780d8acc63dd857a58dd1e.png" },
        { id: 11, name: "Office Support", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/17a53ce4723db844a4d0522455b5162c.png" },
        { id: 12, name: "Healthcare", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/fad25355b43e6acd92a9d038e6d396cb.png" },
        { id: 13, name: "Aviation", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/c1c92b225dda676d3894748483df5d5c.png" },
        { id: 14, name: "Life Sciences", img: "https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/5a73abc51771b77ec989040fdfddcbf6.png" }
      ];
      
  return (
    <div>
      <section className="top-department-catogiries-main-section">
      <div className="container">
        <p className="heading-para">Top Categories</p>
        <div className="row px-0 px-lg-5">
          {categories.map((category) => (
            <div className="col-md-6 col-lg-4 mt-3" key={category.id}>
              <Link to={`/jobs/top-categories/${category.id}`}>
                <div className="each-category">
                  <img src={category.img} alt={category.name} />
                  <p>{category.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}
