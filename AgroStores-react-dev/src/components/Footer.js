
import "../styles/layouts/footer.css"

export const Footer = ()=>{
    return( 
    <footer className="flex-column-center pd-sm">
        <p className="mg-bottom-xsm">Made Spark Squad Team</p>
        <div className="footer-links mg-bottom-xsm">
        <a className="mg-xsm fs-sm-plus" href="https://github.com/dipak-pawar-356"  target="_blank" rel="noreferrer"
            ><i className="fab fa-github"></i
        ></a>
        <a
            className="mg-xsm fs-sm-plus"
            href="https://www.linkedin.com/in/dipakpawar356"
            target="_blank" rel="noreferrer"
            ><i className="fab fa-linkedin-in"></i
        ></a>
        
        </div>
        <p className="copyright mg-bottom-xsm">© 2025 AgroStores</p>
  </footer>
  );
}
