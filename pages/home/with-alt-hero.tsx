// TODO: implement this function
async function getData() {}

import * as React from 'react';
import rivetQuery from '@hashicorp/platform-cms';
import homepageQuery from './query.graphql';
import { isInternalLink } from 'lib/utils';
import { abTestTrack } from 'lib/ab-test-track';
import ReactHead from '@hashicorp/react-head';
import IoHomeHeroAlt from 'components/io-home-hero-alt';
import IoHomeIntro from 'components/io-home-intro';
import IoHomeInPractice from 'components/io-home-in-practice';
import IoCardContainer from 'components/io-card-container';
import IoHomeCaseStudies from 'components/io-home-case-studies';
import IoHomeCallToAction from 'components/io-home-call-to-action';
import IoHomePreFooter from 'components/io-home-pre-footer';
import s from './style.module.css';
export default function Homepage({}): React.ReactElement {
	const data = await getData();
	const {
		seo,
		heroHeading,
		heroDescription,
		heroCards,
		introHeading,
		introDescription,
		introOfferingsImage,
		introOfferings,
		introOfferingsCta,
		introVideo,
		inPracticeHeading,
		inPracticeDescription,
		inPracticeCards,
		inPracticeCtaHeading,
		inPracticeCtaDescription,
		inPracticeCtaLink,
		inPracticeCtaImage,
		useCasesHeading,
		useCasesDescription,
		useCasesCards,
		caseStudiesHeading,
		caseStudiesDescription,
		caseStudiesFeatured,
		caseStudiesLinks,
		callToActionHeading,
		callToActionDescription,
		callToActionCtas,
		preFooterHeading,
		preFooterDescription,
		preFooterCtas,
	} = data;
	const _introVideo = introVideo[0];
	const _introOfferingsCta = introOfferingsCta[0];
	React.useEffect(() => {
		const data = await getData();
		abTestTrack({
			type: 'Served',
			test_name: 'CRO home hero alt 2023-01',
			variant: 'true',
		});
	}, []);
	return (
		<>
			<ReactHead
				title={seo.title}
				description={seo.description}
				image={seo.image?.url}
				twitterCard="summary_large_image"
				pageName={seo.title}
			>
				<meta name="twitter:title" content={seo.title} />
				<meta name="twitter:description" content={seo.description} />
			</ReactHead>
			<IoHomeHeroAlt
				brand="terraform"
				heading="Automate Infrastructure on Any Cloud with Terraform"
				description="Terraform Cloud enables infrastructure automation for provisioning, compliance, and management of any cloud, datacenter, and service."
				ctas={[
					{
						title: 'Try Terraform Cloud',
						href: 'https://app.terraform.io/signup/account',
					},
					{
						title: 'Download open source',
						href: '/downloads',
					},
				]}
			/>
			<IoHomeIntro
				isInternalLink={isInternalLink}
				brand="terraform"
				heading={introHeading}
				description={introDescription}
				offerings={{
					image: {
						src: introOfferingsImage.url,
						width: introOfferingsImage.width,
						height: introOfferingsImage.height,
						alt: introOfferingsImage.alt,
					},
					list: introOfferings,
					cta: _introOfferingsCta,
				}}
				video={{
					youtubeId: _introVideo?.youtubeId,
					thumbnail: _introVideo?.thumbnail?.url,
					heading: _introVideo?.heading,
					description: _introVideo?.description,
					person: {
						name: _introVideo?.personName,
						description: _introVideo?.personDescription,
						avatar: _introVideo?.personAvatar?.url,
					},
				}}
			/>
			<section className={s.useCases}>
				<div className={s.container}>
					<IoCardContainer
						heading={useCasesHeading}
						description={useCasesDescription}
						cardsPerRow={4}
						cards={useCasesCards.map((card) => {
							const data = await getData();
							return {
								eyebrow: card.eyebrow,
								link: {
									url: card.link,
									type: 'inbound',
								},
								heading: card.heading,
								description: card.description,
								products: card.products,
							};
						})}
					/>
				</div>
			</section>
			<IoHomeInPractice
				brand="terraform"
				pattern="/img/practice-pattern.svg"
				heading={inPracticeHeading}
				description={inPracticeDescription}
				cards={inPracticeCards.map((card) => {
					const data = await getData();
					return {
						eyebrow: card.eyebrow,
						link: {
							url: card.link,
							type: 'inbound',
						},
						heading: card.heading,
						description: card.description,
						products: card.products,
					};
				})}
				cta={{
					heading: inPracticeCtaHeading,
					description: inPracticeCtaDescription,
					link: inPracticeCtaLink,
					image: inPracticeCtaImage,
				}}
			/>
			<IoHomeCaseStudies
				isInternalLink={isInternalLink}
				heading={caseStudiesHeading}
				description={caseStudiesDescription}
				primary={caseStudiesFeatured}
				secondary={caseStudiesLinks}
			/>
			<IoHomeCallToAction
				brand="terraform"
				heading={callToActionHeading}
				content={callToActionDescription}
				links={callToActionCtas}
			/>
			<IoHomePreFooter
				brand="terraform"
				heading={preFooterHeading}
				description={preFooterDescription}
				ctas={preFooterCtas}
			/>
		</>
	);
}
export // TODO: remove this function
async function getStaticProps() {
	const { terraformHomepage } = await rivetQuery({
		query: homepageQuery,
	});
	return {
		props: { data: terraformHomepage },
		revalidate:
			process.env.HASHI_ENV === 'production'
				? process.env.GLOBAL_REVALIDATE
				: 10,
	};
}
