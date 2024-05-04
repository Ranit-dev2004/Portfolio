import { DecoderText } from '../../components/decoder-text';
import { Heading } from '../../components/heading';
import { Section } from '../../components/section';
import { Text } from '../../components/text';
import { Transition } from '../../components/transition';
import { baseMeta } from '../../utils/meta';
import { useActionData } from '@remix-run/react';
import styles from './skills.module.css';
import { Divider } from '../../components/divider';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};
export const skills = () => {
  const actionData = useActionData();
  return (
    <Section className={styles.contact}>
      <Transition unmount in={!actionData?.success} timeout={600}>
        {({ status}) => (
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
            >
              <DecoderText text="Technologies I know" start={status !== 'exited'} delay={600} />
              <span aria-hidden className={styles.row}>
                  <span className={styles.line} data-status={status} />
                </span>
            </Heading>)}
      </Transition>
      <Text className={styles.description}  size="l" as="p">
      With a strong foundation in web development technologies, I am proficient in HTML, CSS, and JavaScript, which allows me to craft elegant and responsive user interfaces. My expertise extends to backend development with Node.js and Express.js, enabling me to build scalable and efficient server-side applications.
I am also skilled in Python and Django, which I use to create robust web applications with a focus on security and maintainability. Leveraging my knowledge in frontend frameworks like React.js, I develop dynamic and interactive user interfaces, providing seamless user experiences. Additionally, I have experience with Next.js, which I utilize to build server-rendered React applications, ensuring fast loading times and improved SEO performance.
My diverse skill set enables me to develop end-to-end web solutions, from frontend to backend, with a keen eye on performance, security, and user experience.
</Text >
<ul className={styles.chart}>
    <li className={styles.list}>Html  <span className={styles.box}><b>95%</b></span></li>
    <li className={styles.list}>CSS  <span className={styles.box}><b>92%</b></span></li>
    <li className={styles.list}>JavaScript(main)   <span className={styles.box}><b>94%</b></span></li>
    <li className={styles.list}>Python   <span className={styles.box}><b>86%</b></span></li>
    <li className={styles.list}>Mongodb   <span className={styles.box}><b>90%</b></span></li>
</ul>
    </Section>
  );
};
