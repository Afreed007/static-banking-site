import { card } from "../assests";
import styles, { layout } from "../style";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Find a better card deal <br className="sm:block hidden"/> in few steps
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
      aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
)

export default CardDeal;