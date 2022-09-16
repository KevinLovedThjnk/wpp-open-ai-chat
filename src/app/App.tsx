import {
  WppTypography,
  WppTopbar,
  WppCard,
  WppActionButton,
  WppIconArrow,
  WppIconCodeView,
  WppIconEdit,
  WppIconTune,
} from '@platform-ui-kit/components-library-react'
import { useOs } from '@wpp-open/react'
import React from 'react'

import styles from 'app/App.module.scss'
import logoUrl from 'assets/logo.svg'

export function App() {
  /**
   * Hook, provided by custom package for more convenient work with OS context
   * @return baseUrl
   * - is an entry point for your Router
   * @return osContext
   * - is a subscribe function that returns you the main context object with MicroAppContext data
   * @return osApi
   * - methods to fire actions on the parent OS level
   * Read more about it in the README file
   */
  //Uncomment line to receive OS context
  /**const { baseUrl, osContext, osApi } = useOs()**/

  const { osContext, osApi } = useOs()
  const { firstname, lastname, country, agency, email, id } = osContext.userDetails

  const cardsData = [
    {
      title: 'Build Your App',
      description: 'Use micro-frontend approach to create your app',
      linkTitle: 'Documentation',
      linkUrl: '',
      icon: <WppIconCodeView color="var(--wpp-brand-color)" />,
    },
    {
      title: 'Design Guidelines',
      description: 'Follow the instructions to create your app layout',
      linkTitle: 'View Guidelines',
      linkUrl: '',
      icon: <WppIconEdit color="var(--wpp-brand-color)" />,
    },
    {
      title: 'UI Components',
      description: 'Use ready-made design components in the app',
      linkTitle: 'View Components',
      linkUrl: '',
      icon: <WppIconTune color="var(--wpp-brand-color)" />,
    },
  ]

  const userData = [
    { title: 'User name', value: [firstname, lastname].filter(Boolean).join(' ') || '-' },
    { title: 'Email', value: email || '-' },
    { title: 'Agency', value: agency || '-' },
    { title: 'Country', value: country || '-' },
    { title: 'ID', value: id || '-' },
  ]

  return (
    <div className={styles.container}>
      <WppTopbar
        className={styles.wppTopBar}
        navigation={
          [
            /**Render your navigation here **/
          ]
        }
      >
        <div slot="app" className={styles.wppTopBarLogo}>
          <img src={logoUrl} alt="logo" />
          <WppTypography className={styles.wppTopBarTitle} type="3xl-heading" tag="h2">
            Your app
          </WppTypography>
        </div>
      </WppTopbar>
      <div className={styles.innerContainer}>
        <div className={styles.intro}>
          <WppTypography type="2xl-heading" tag="h3" className={styles.introTitle}>
            Welcome to the App Boilerplate
          </WppTypography>
          <WppTypography type="m-body" tag="p">
            Create your own app for WPP Open Platform
          </WppTypography>
        </div>
        <div className={styles.cards}>
          {cardsData.map(card => {
            return (
              <WppCard className={styles.card} key={card.title}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <WppTypography className={styles.cardTitle} type="l-strong" tag="h4">
                  {card.title}
                </WppTypography>
                <WppTypography className={styles.cardDescription} type="s-body" tag="span">
                  {card.description}
                </WppTypography>
                <WppActionButton>
                  {card.linkTitle}
                  <WppIconArrow slot="icon-end" />
                </WppActionButton>
              </WppCard>
            )
          })}
        </div>
        <WppCard className={styles.sectionUpload}>
          <WppActionButton className={styles.sectionUploadButton}>
            How to upload app to the Marketplace?
          </WppActionButton>
        </WppCard>
        <WppCard className={styles.sectionUserDetails}>
          <div className={styles.userDetails}>
            {userData.map(({ title, value }) => {
              return (
                <div key={title} className={styles.userItem}>
                  <WppTypography className={styles.userDetailsTitle} type="xs-body">
                    {title}
                  </WppTypography>
                  <WppTypography className={styles.ellipsis} type="s-body">
                    {value}
                  </WppTypography>
                </div>
              )
            })}
          </div>
          <WppActionButton onClick={() => navigator.clipboard.writeText(osApi.getAccessToken())}>
            Copy auth token
          </WppActionButton>
        </WppCard>
      </div>
    </div>
  )
}
