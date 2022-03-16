import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { TermsAndCondition } from 'src/terms-and-conditions/terms-and-condition.entity';

export default class CreateTermsAndConditions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countTermsAndCondition = await connection
      .createQueryBuilder()
      .select()
      .from(TermsAndCondition, 'TermsAndCondition')
      .where('"TermsAndCondition"."type" = :type', { type: 'terms and conditions' })
      .getCount();

    if (countTermsAndCondition === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(TermsAndCondition)
        .values([
          plainToClass(TermsAndCondition, {
            type: 'terms and conditions',
            description: `1. INTRODUCTION
            1.1 These terms of use explain how you may use this app and website (the “GuidED
            Platform”). References in these terms to the GuidED Platform includes the following
            website: GuidED - http://www.guided.ca and all associated web pages. You should
            read these terms and conditions carefully before using the GuidED Platform. By
            accessing or using this GuidED Platform or otherwise indicating your consent, you
            agree to be bound by these terms and conditions and the documents referred to in
            them. If you do not agree with or accept any of these terms, you should cease using
            the GuidED Platform immediately. If you have any questions about the app and/or
            website, please contact info@guided.ca.
            1.2 Definitions
            a) “Content” means any text, image, video, audio or other multimedia content,
            software or other information or material submitted to, subsisting on or
            accessible from the GuidED Platform.
            b) “We”, “us” or “our” means Guided Tobermory Inc. (the “GuidED”) and its
            affiliates.
            c) “You” or “your” means the person accessing or using the GuidED Platform or
            its Content.
            d) GuidED offers an online venue that enables users (“Members”) to publish,
            offer, search for, and book services. Members who publish and offer services
            are “Guides” and Members who search for, book, or use services are
            “Travelers.” Guides offer leading, instructing and training activities, excursions,
            and events (“Experiences”), and a variety of other services (collectively,
            “Guiding Services,” and each Guiding Service offering, a “Listing”). You must
            register an account to access and use many features of the GuidED Platform
            and must keep your account information accurate. As the provider of the
            GuidED Platform, GuidED does not own, control, offer or manage any Listings
            or Guiding Services. GuidED is not a party to the contracts concluded directly
            between Guides and Travelers, nor as an agent in any capacity for any
            Member.
            e) Guides are responsible for understanding and complying with all laws, rules,
            regulations and contracts with third parties that apply to your Guiding Services.
            1.3 Privacy Statement: these terms include our Privacy Statement which shall be subject
            to these terms in the event of any conflict or inconsistency. These terms may also be
            supplemented or replaced by additional terms, such as our Privacy Policy (“Additional
            Terms”), relating to specific content, goods or services made available on relevant
            pages of the GuidED Platform. Additional Terms will be made available on relevant
            pages of the GuidED Platform and will be accessible by you for your acceptance
            
            before you place an order. Additional Terms shall prevail to the extent that there is any
            conflict or inconsistency with any other of these terms.
            1.4 Intended Use: This GuidED Platform is intended for and directed to residents of
            Canada over the age of 18 years.
            
            1.5 Accessibility: We seek to make this GuidED Platform as accessible as possible. If
            you have any problems accessing this GuidED Platform or the content contained on
            it, please contact us at info@guided.ca
            2. TERM AND TERMINATION
            2.1 The agreement between you and GuidED reflected by these Terms and Conditions is
            effective when you access the GuidED Platform and remains in effect until either you
            or we terminate the agreement in accordance with these Terms and Conditions.
            2.2 You may terminate this agreement at any time by sending us an email requesting to
            terminate your account. We may terminate this agreement and your account for any
            reason by giving you 30 days’ notice via email or using any other contact information
            you have provided for your account. We may also terminate this agreement
            immediately and without notice and stop providing access to the GuidED Platform if
            you breach these Terms and Conditions, you violate our Policies, you violate
            applicable laws, or we reasonably believe termination is necessary to protect GuidED,
            its Members, or third parties. If your account has been inactive for more than two years,
            we may terminate your account without prior notice.
            2.3 If you are a Guide and wish to terminate your GuidED account, any confirmed
            booking(s) will be automatically cancelled and your Users will receive a full refund. If
            you terminate your account as a Traveler, any confirmed booking(s) will be
            automatically cancelled and any refund will depend upon the terms of the reservation’s
            cancellation policy. When this agreement has been terminated, you are not entitled to
            a restoration of your account or any of your content. If your access to or use of the
            GuidED Platform has been limited, or your GuidED account has been suspended, or
            this agreement has been terminated by us, you may not register a new account or
            access or use the GuidED Platform through an account of another Member.
            3. YOUR ACCOUNT AND MEMBERSHIP
            3.1 You may be required to create an account and specify a password in order to use
            certain services or features on the GuidED Platforms. To create an account, you must
            be at least 18 years old and you must provide truthful and accurate information about
            yourself. You are not allowed to impersonate anyone else when you create your
            account. If your information changes at any time, please update your account to reflect
            those changes.
            3.2 You may not share your account with anyone else. Please keep your password
            confidential and try not to use it on other websites. If you believe that your account has
            been compromised at any time, please notify us at info@guided.ca
            
            3.3 We offer two types of Individual Membership: A Traveler (User) membership, and a
            Guide membership.
            3.4 Based on the membership chosen, your account will reflect the relevant booking fee
            being charged to the card details submitted by the you during registration for the
            service purchase and/or provided to the users. You can be both a Traveler & a Guide,
            and easily switch between accounts in your profile.
            3.5 The membership may be cancelled at any time, subject to the provisions of this
            section.
            3.6 In order to cancel a membership, you must contact GuidED customer support at
            info@guided.ca. Once you have confirmed your cancellation details, you will receive
            a confirmation email to let you know that this has been successfully processed.
            3.7 We reserve the right to change the features, content or services related to any
            membership package without notice to the user in order to improve the quality of the
            membership offered to you or to comply with any relevant laws, regulations or to our
            policies. The fees charged for each membership type is priced as advertised on the
            GuidED Platform at time of creating your account, and we, in our sole discretion,
            reserve the right to amend or change any fee and price. Existing members will be
            provided with notice of any changes to future fees and prices. Any special offer or
            discount offered may be withdrawn or changed without notice.
            
            3.8 The membership is to be used by a sole individual per login credentials and is non-
            transferable. Membership benefits including logins, access to content and services are
            
            linked to a specific user and cannot be shared with other non-users. We shall monitor
            the number of devices used to access a membership and breach of these terms may
            result in revoking your access to the GuidED Platform. In the event of access being
            revoked due to breach of this clause, no refund shall be provided for any membership
            fees you may have already paid.
            4. BOOKING – FOR TRAVELERS (USER)
            4.1 When you book a Listing, you are agreeing to pay all charges for your booking
            including the Listing price, applicable fees like GuidED’s service fee, offline fees, taxes,
            and any other items identified during checkout (collectively, “Total Price”). You are also
            agreeing that we may charge and collect any security deposit identified during
            checkout. When you receive the booking confirmation, a contract for Guiding Services
            is formed directly between you and the Guide. The cancellation policy and any other
            rules, standards, policies, or requirements identified in the Listing or during checkout
            form part of your contract with the Guide. Be aware that some Guides work with a
            company as part of a team to provide their Guiding Services.
            4.2 You are responsible for confirming that you, and anyone you invite, meet minimum
            age, proficiency, fitness, or other requirements. You are responsible for informing the
            Guide of any medical or physical conditions, or other circumstances that may impact
            your ability to participate, attend, or use the Guiding Service. Except where expressly
            authorized, you may not allow any person to join a Guiding Service unless they are
            included as an additional TRAVELER during the booking process. In the event that a
            person attending a tour is not a Member, such person must provide the Guide with
            
            their names and ages. The Traveler Release & Waiver Form MUST BE SIGNED by
            all Travelers attending the Adventure Tour.
            4.3 You are responsible and liable for your own acts and omissions and are also
            responsible for the acts and omissions of anyone you invite to join or provide access
            to any Guiding Service. For example, this means you must act with integrity, treat
            others with respect, and comply with applicable laws at all times. If you are booking
            for an additional user who is a minor or if you bring a minor to a Guiding Service, you
            must be legally authorized to act on behalf of the minor and you are solely responsible
            for the supervision of that minor. You must inform the Guide if you are bringing an
            individual under the age of 18. The Waiver must be signed.
            4.4 You acknowledge that many activities carry inherent risks and agree that, to the
            maximum extent permitted by applicable law, you assume the entire risk arising out of
            your access to and use of the Guided Platform, including your participation in any
            Guiding Services, or any other interaction you have with other Members whether in
            person or online. This means it is your responsibility to investigate a Guiding Service
            to determine whether it is suitable for you. For example, Guiding Services may carry
            risk of illness, bodily injury, disability, or death, and you freely and willfully assume
            those risks by choosing to participate in those Guiding Services.
            5. GUIDING – FOR GUIDES
            5.1 When you accept a booking request, or receive a booking confirmation through the
            GuidED Platform, you are entering into a contract directly with the Traveler and are
            responsible for delivering your Guiding Service under the terms and at the price
            specified in your Listing. You are also agreeing to pay applicable fees like GuidED’s
            service fee (and applicable taxes) for each booking. We will deduct amounts you owe
            from your payout unless we and you agree to a different method. Any terms, policies
            or conditions that you include in any supplemental contract with Traveler must: (i) be
            consistent with these Terms and Conditions, our policies, and the information provided
            in your Listing, and (ii) be prominently disclosed in your Listing description.
            5.2 Guides must honor their bookings, unless the guide must cancel due to a valid
            extenuating circumstance such as declared emergencies and epidemics, military
            actions and other Guideilities, natural disasters, safety concerns, or dangerous
            weather conditions.
            5.3 Your Listing must include complete and accurate information about your Guiding
            Service, your price, other charges such as security deposits, offline fees, and any rules
            or requirements that apply to your Traveler or Listing. You are responsible for keeping
            your Listing information (including calendar availability) and content (such as photos)
            up to date and accurate at all times. We recommend that you obtain appropriate
            insurance for your Guiding Services and suggest you carefully review policy terms and
            conditions including coverage details and exclusions. You may only maintain one
            Listing per Guiding Service.
            5.4 When listing a Guiding Service you must, where applicable, fully educate and inform
            Travelers about (i) any risks inherent or incidental to the activities, (ii) any requirements
            for participation, such as the minimum age, related skills, or level of fitness, and (iii)
            
            anything else they may need to know to safely participate in the activities (including
            dress codes, equipment, special certifications or licenses, etc.). GuidED reserves the
            right to decide, in its sole discretion, whether a submitted Listing will be published on
            the GuidED Platform.
            5.5 If an activity includes a technically specialized activity where we require proof of a
            license, certification, or insurance, it will not be published if any of the following is true:
            1) the Guide does not submit the requested documents; 2) the requested documents
            are expired; 3) the name(s) on the documents does not match the name listed on the
            Guide’s GuidED profile; 4) the documents don’t meet our license or insurance
            requirements; or 5) We cannot process the provided documents for any other reason
            (e.g. blurry photo or unrecognized document type).
            5.6 If we are made aware that a Listing, Experience, and/or their Guides violates our
            platform policies, community standards, or terms of service, we take action including
            permanent removal from our community if warranted. We’re constantly reviewing and
            revising our platform policies and protections in order to make the adventures and
            Experiences offered on GuidED safer and higher quality.
            5.7 You are responsible for providing all equipment, including supplies, vehicles, venues
            and other materials ("Equipment") necessary to the Guiding Services. You are solely
            responsible for ensuring that the Equipment used in your Experience is in good
            working order and conforms to all laws pertaining to safety, equipment, inspection, and
            operational capability. Except as otherwise required by law, you assume all risk of
            damage or loss to your Equipment.
            5.8 You are responsible for (i) understanding and complying with all laws, rules and
            regulations that may apply to your Guiding Services, (ii) obtaining any required
            licenses, permits, or registrations prior to providing your Experience; and (iii) ensuring
            that your Listing and/or Guiding Services will not breach any agreement you may have
            with any third party.
            5.9 We may require that you obtain your own insurance in order to publish a Listing on the
            GuidED Platform. In such cases, you agree to obtain and maintain insurance for you,
            the members of your team or organization, and/or your Listing with the coverage and
            in the amounts determined by us in our sole discretion for any and all activities that
            take place on your Listing. You agree to cooperate with GuidED to verify such
            insurance coverage. In the event that GuidED has obtained its own liability insurance
            that covers your Listing, your insurance will be the primary source of coverage and
            GuidED’s insurance will operate as excess or secondary insurance for any amounts
            exceeding your coverage. Our procurement of such secondary insurance coverage
            does not relieve you of your obligation to obtain insurance in amounts required by us.
            5.10 Your relationship with GuidED is that of an independent individual or entity and not
            an employee, agent, joint venturer, or partner of GuidED. GuidED does not direct or
            control your Guiding Service, and you agree that you have complete discretion
            whether and when to provide Guiding Services, and at what price and on what terms
            to offer them.
            5.11 Guides may not solicit an online or offline payment from Travelers outside of the
            GuidED’s Platform.
            
            5.12 You acknowledge that Guiding Services carries inherent risks and agree that you
            assume the entire risk arising out of your access to and use of the GuidED Platform,
            offering Experiences and Guiding Services, or any interaction you have with other
            Members whether in person or online. You agree that you have had the opportunity to
            investigate the GuidED Platform and any laws, rules, regulations, or obligations that
            may be applicable to your Listings or Guiding Services and that you are not relying
            upon any statement of law made by GuidED.
            6. RESTRICTIONS ON USE
            6.1 This GuidED Platform is for your personal and non-commercial use only. As a
            condition of your use of the GuidED Platform, you agree:
            a) not to use this GuidED Platform for any purpose that is unlawful under
            applicable law, or prohibited by these terms and conditions;
            b) not to defame or disparage anybody or make comments of an obscene,
            derogatory or offensive manner or otherwise use this GuidED Platform or its
            Content in a way that brings us or any third party into disrepute or causes us
            to be liable to any third party;
            c) not to reverse engineer, decompile, copy, modify, distribute, transmit, license,
            sublicense, display, revise, perform, transfer, sell or otherwise make available
            to any third party or otherwise publish, deep link, create derivative works from
            or exploit in any way this GuidED Platform or its Contents except as permitted
            by us under these terms or as expressly provided under applicable law and/or
            under any Additional Terms;
            d) not to use this GuidED Platform to distribute viruses or malware or other similar
            harmful software codes
            e) not to represent or suggest that we endorse any other business, product, or
            service unless we have separately agreed to do so in writing; and
            f) that you are solely responsible for all costs and expenses you may incur in
            relation to your use of this GuidED Platform and shall be solely responsible for
            keeping your password and other account details confidential.
            
            6.2 We reserve the right to prevent or suspend your access to this GuidED Platform if you
            do not comply with any part of these terms and conditions or any applicable law.
            7. OWNERSHIP, USE AND INTELLECTUAL PROPERTY RIGHTS
            7.1 This GuidED Platform and all intellectual property rights in this GuidED Platform
            (including without limitation any Content) are owned by us and/or our licensors. All
            Content, information, and materials appearing on or emanating from the provision of
            the services (including, but not limited to news articles, photographs, images,
            illustrations, audio clips, video clips, links, forum posts, chat posts, messages, emails),
            are protected by copyright, and owned or controlled by us or the party credited as the
            provider of the Content. We and our licensors reserve all our intellectual property rights
            (which include without limitation all copyright, trademarks, domain names, design
            rights, database rights, patents, and all other intellectual property rights of any kind)
            whether registered or unregistered anywhere in the world.
            
            7.2 Nothing in these terms and conditions grants you any rights in the GuidED Platforms
            other than as necessary to enable you to access this GuidED Platform. You agree not
            to adjust to try to circumvent or delete any intellectual property notices contained on
            this GuidED Platform and in particular in any digital rights or other security technology
            embedded or contained within any GuidED Platform Content.
            7.3 The Services and Content are protected by copyright pursuant to Canada, U.S. and
            international copyright laws. You may not modify, publish, transmit, participate in the
            transfer or sale of, reproduce, create new works from, distribute, perform, display, or
            in any way exploit, any of the Content or the Services (including software) in whole or
            in part.
            7.4 You may download or copy the Content and other downloadable items displayed on
            the GuidED Platform or Services for personal use only, provided that you maintain and
            abide by any author attribution, copyright or trademark notice or restriction in any
            material that you download or print.
            7.5 You will not sell, redistribute, retransmit, reproduce, display, or otherwise provide
            access to the Content to any third party, nor modify or create derivative works from
            any Content.
            7.6 Trademarks: The use or misuse of any trademarks or any other Content on this
            GuidED Platform except as provided in these terms and conditions is strictly
            prohibited. Nothing contained on the GuidED Platform shall be construed as granting,
            by implication, estoppel or otherwise, any license or right to use any trademark without
            our prior written permission.
            8. SOFTWARE
            8.1 Where any software is made available for downloading from the GuidED Platform, this
            is our copyrighted work and/or that of our licensors. You may only use such software
            in accordance with the terms of the end user license agreement, if any, which
            accompanies the software and, subject thereto, in accordance with these terms. All
            
            such software is made available for downloading solely for your use in a non-
            commercial manner. Any reproduction or redistribution of software not in accordance
            
            with the end user license agreement and/or these terms is expressly prohibited and
            may result in severe civil and criminal penalties.
            8.2 Our software is warranted only to the extent expressly required by law or according to
            the terms of the end user license agreement. We hereby disclaim all other warranties,
            conditions, and other terms (whether express or implied) with regard to the software,
            including all implied warranties and conditions of satisfactory quality, freedom from
            defects and fitness for a particular purpose. In no event shall our aggregate liability in
            respect of any such software exceed the limitations of liability in the applicable end
            user license agreement. Or in all other cases the amount you paid us for the relevant
            software.
            8.3 The provision of the service may include features that operate in conjunction with
            certain third-party software, and website such as Google Maps, Stripe, Amazon
            Guiding Services, or social networking websites that you visit such as Facebook,
            Instagram, YouTube, Vimeo, and Twitter (“Social Network Features”). While your use
            
            of the Social Network Features is governed by these Terms, your access and use of
            third-party social networking sites and the services provided through the Services is
            governed by the terms of service and other agreements posted on these sites. You
            are responsible for ensuring that your use of those sites complies with any applicable
            terms of service or other agreements.
            9. SUBMITTING INFORMATION TO THE GUIDED PLATFORM
            9.1 The GuidED Platform is not a secure means of communication and any information
            you supply to us will not be kept confidential. For that reason, you should not submit
            or send to us any patentable ideas or patent applications, advertising or marketing
            suggestions, prototypes or any information, written or oral, which you regard as
            confidential or commercially sensitive or valuable (collectively referred to as
            “Unwanted Submissions “). While we value your feedback, you agree not to submit
            any Unwanted Submissions. Any submission (including any Unwanted Submission)
            made to us is deemed to be our property. By transmitting or posting any submission
            or other material to us, you agree that, subject to our Privacy Statement, we are
            entitled to use any such information in any manner we see fit (including reproduction,
            transmission, publication, broadcast, and posting on any media and anywhere in the
            world) on a free of charge basis. We shall not be subject to any obligation of
            confidentiality nor be liable for any use and/or disclosure of such submissions.
            9.2 Where our GuidED Platform enables you to communicate with us and/or other users
            of the GuidED Platform, you may not use this GuidED Platform to transmit harmful or
            offensive (e.g., violent, obscene, discriminatory, defamatory, or otherwise illegal)
            communications or material which might otherwise bring us or these GuidED Platform
            into disrepute. Although we reserve the right to monitor, edit, review, or remove
            discussions, chats, postings, transmissions, bulletin boards and similar
            communications on this GuidED Platform from time to time, we are under no obligation
            to do so and assume no responsibility or liability arising from any Content posted on
            this GuidED Platform nor for any error, omission, infringement, defamatory statement,
            obscenity, or inaccuracy contained in any such information. Our right to use
            submissions or other material provided by you is non-exclusive, freely transferable,
            and worldwide so you shall be entitled to use your own material yourself subject to
            applicable law.
            9.3 You represent and warrant that any Content you supply to us is and shall be your own
            original work and has been lawfully provided to us and that you have all necessary
            consents to provide this to us and that we shall be entitled to disclose your name with
            any such Content that we may choose to publish. You agree that you waive all moral
            rights you may have in any such Content but that any personal data you supply with
            your Content may, if we choose to do so, be used by us as described in our Privacy
            Statement. We accept no liability in respect of any content submitted by users and
            published by us or by authorized third parties.
            9.4 You shall not upload to, or distribute, or otherwise publish on to the Services any
            libelous, defamatory, obscene, pornographic, abusive, or otherwise illegal material.
            
            9.5 The Services shall be used only in a noncommercial manner. You shall not, without
            our express approval, distribute or otherwise publish any material containing any
            solicitation of funds, advertising or solicitation for goods or services.
            10. ACCURACY OF INFORMATION AND AVAILABILITY OF THE GUIDED PLATFORM
            10.1 While we use reasonable efforts to include accurate and up-to-date information on
            the GuidED Platform, we do not represent, warrant or promise (whether expressly or
            by implication) that any Content is or remains available, accurate, complete, and up to
            date, free from bugs, errors or omissions or fit or suitable for any purpose. Any reliance
            you may place on the information on this GuidED Platform is at your own risk and we
            may suspend or terminate operation of the GuidED Platform at any time at our sole
            discretion. Nothing in these terms and conditions shall operate to prejudice any
            mandatory statutory requirement or your statutory rights. Content on the GuidED
            Platform is provided for your general information purposes only and to inform you
            about us and our products and news, features, services, and other websites, which
            may be of interest. It does not constitute technical, financial, or legal advice or any
            other type of advice and should not be relied on for any purpose.
            10.2 While we make commercially reasonable efforts to ensure that this GuidED
            Platform is available, we do not represent, warrant or guarantee in any way this
            GuidED Platform’ continued availability at all times or uninterrupted use by you of this
            GuidED Platform.
            11. HYPERLINKS AND THIRD-PARTY SITES
            11.1 The GuidED Platform may contain hyperlinks or references to third party websites
            other than this GuidED Platform. Any such hyperlinks or references are provided for
            your convenience only. We have no control over third party websites and accept no
            responsibility for any content, material or information contained in them. The display
            of any hyperlink and reference to any third-party website does not constitute an
            
            endorsement of such third party’s website, products, or services. Your use of a third-
            party site may be governed by the terms and conditions of that third-party site.
            
            12. WARRANTIES AND LIMITATION OF LIABILITY
            12.1 You agree that your use of this GuidED Platform is on an “as available” basis. As
            stated above, except as otherwise expressly required by applicable law, we make no
            representations, warranties, conditions, or other terms (whether express or implied) in
            relation to the provision of this GuidED Platform, including without limitation as to
            completeness, accuracy and currency or any Content on the GuidED Platform, or as
            to satisfactory quality, or fitness for a particular purpose.
            12.2 To the maximum extent permitted by applicable law, we exclude all liability
            (whether arising in contract, tort, breach of statutory duty or otherwise) which we may
            otherwise have as a result of any error or inaccuracies in any Content, the
            unavailability of this GuidED Platform for any reason, and any representation or
            statement made on this GuidED Platform.
            
            12.3 We will not be liable for any loss or damage we cause which we could not
            reasonably anticipate when you started using this GuidED Platform, for example if you
            lose revenue, salary, profits, or reputation as a result of your use of this GuidED
            Platform and/or the acts or omissions of any third party such as other users of the
            GuidED Platform or any other indirect or consequential loss or damage you may incur
            in relation to this GuidED Platform and its Content.
            12.4 Under no circumstances shall our aggregate liability to you for any and all claims
            arising from your use of the GuidED Platform (including the downloading or use of any
            Content) exceed to the extent permitted by law the amounts paid by you to us in
            relation to your use of the GuidED Platform or its Content.
            12.5 Notwithstanding any other provision of these terms and conditions, we do not
            exclude or limit our liability for death or personal injury arising from our negligence, for
            any fraudulent misrepresentation made by us on the GuidED Platform or for any other
            statutory rights which are not capable of being excluded.
            12.6 Any exclusions and limitations of liability in these terms shall be subject to the
            Additional Terms in respect of matters covered by those Additional Terms and as
            otherwise required by law.
            13. INDEMNIFICATION AND LIMITATION OF LIABILITY
            13.1 To the maximum extent permitted by applicable law, you agree to release, defend,
            at GuidED’s option, indemnify, and hold GuidED (including its affiliates, and their
            personnel) harmless from and against any claims, liabilities, damages, losses, and
            expenses, including, without limitation, reasonable legal and accounting fees, arising
            out of or in any way connected with: (i) your breach of these Terms and Conditions
            (including any supplemental or additional terms that apply to a product or feature) or
            our policies or standards, (ii) your improper use of the GuidED Platform, (iii) your
            interaction with any Member, participation in an Experience or other Guiding Service,
            including without limitation any injuries, losses or damages (whether compensatory,
            direct, incidental, consequential or otherwise) of any kind arising in connection with or
            as a result of such interaction, participation or use, (iv) your failure, or our failure at
            your direction, to accurately report, collect or remit taxes, or (v) your breach of any
            laws, regulations or third party rights such as intellectual property or privacy rights.
            13.2 Neither GuidED (including its affiliates and personnel) nor any other party involved
            in creating, producing, or delivering the GuidED Platform or any Content will be liable
            for any incidental, special, exemplary or consequential damages, including lost profits,
            loss of data or loss of goodwill, service interruption, computer damage or system
            failure or the cost of substitute products or services, or for any damages for personal
            or bodily injury or emotional distress arising out of or in connection with (i) these Terms,
            (ii) the use of or inability to use the GuidED Platform or any Content, (iii) any
            communications, interactions or meetings you may have with someone you interact or
            meet with through, or as a result of, your use of the GuidED Platform, or (iv) publishing
            or booking of a Listing, including the provision or use of Guiding Services, whether
            based on warranty, contract, tort (including negligence), product liability or any other
            legal theory, and whether or not GuidED has been informed of the possibility of such
            
            damage, even if a limited remedy set out in these Terms of Use Agreement is found to
            have failed of its essential purpose.
            13.3 In no event will GuidED’s aggregate liability for any claim or dispute arising out of
            or in connection with these Terms of Use Agreement, your interaction with any
            Members, or your use of or inability to use the GuidED Platform, any Content, or any
            Guiding Service, exceed: (A) to Travelers, the amount you paid as a Traveler during
            the 12-month period prior to the event giving rise to the liability, (B) to Guides, the
            amount paid to you as a Guide in the 12-month period prior to the event giving rise to
            the liability, or (C) to anyone else, one hundred U.S. dollars (US$100).
            14. GENERAL
            14.1 These terms are dated May 18, 2021. No changes to these terms are valid or have
            any effect unless agreed by us in writing. We reserve the right to vary these terms and
            conditions from time to time. Our new terms will be displayed on the GuidED Platform
            and by continuing to use and access the GuidED Platform following such changes,
            you agree to be bound by any variation made by us. It is your responsibility to check
            these terms and conditions from time to time to verify such variations.
            14.2 Unless otherwise expressly stated in these terms and conditions, all notices from
            you to us must be in writing and sent to our contact address at 80 Maple Golf Cres,
            Tobermory, ON, Canada, N0H 2R0 and all notices from us to you will be displayed on
            our website.
            14.3 We shall have no liability to you for any breach of these terms caused by any event
            or circumstance beyond our reasonable control including, without limitation, strikes,
            lockouts and other industrial disputes, breakdown of systems or network access, flood,
            fire, explosion, or accident, military strife & pandemics.
            14.4 If any part of these terms and conditions is unenforceable (including any provision
            in which we exclude or limit our liability to you) the enforceability of any other part of
            these terms and conditions will not be affected. If we choose not to enforce any right
            that we have against you at any time, then this does not prevent us from later deciding
            to exercise or enforce that right.
            14.5 These terms and conditions (together with the Privacy Statement and any
            applicable Additional Terms contain the entire understanding and agreement between
            us and you in relation to your use of the GuidED Platform and supersede and replace
            any representation, statement, or other communication (whether written or otherwise)
            made by you or us which is not contained herein. Save for fraud or fraudulent
            misrepresentation, we shall have no liability for any such representation being untrue
            or misleading.
            14.6 You may not assign, sub-license or otherwise transfer any of your rights and
            obligations in these terms to any other person.
            14.7 These terms and conditions shall be construed in accordance with and governed
            by the laws in effect within the Province of Ontario, Canada.`,
          }),
        ])
        .execute();
    }

    const countTravelerReleaseAndWaiverForm = await connection
      .createQueryBuilder()
      .select()
      .from(TermsAndCondition, 'TermsAndCondition')
      .where('"TermsAndCondition"."type" = :type', { type: 'traveler release and waiver form' })
      .getCount();

    if (countTravelerReleaseAndWaiverForm === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(TermsAndCondition)
        .values([
          plainToClass(TermsAndCondition, {
            type: 'traveler release and waiver form',
            description: `Last update: August 28, 2021
            RELEASE OF LIABILITY, WAIVER OF CLAIMS AND ASSUMPTION OF RISK AGREEMENT
            BY SIGNING THIS DOCUMENT, YOU WILL WAIVE CERTAIN LEGAL RIGHTS, INCLUDING THE
            RIGHT TO SUE OR CLAIM COMPENSATION FOLLOWING AN ACCIDENT OR INJURY.
            PLEASE READ CAREFULLY!
            This Traveler Release and Waiver is made pursuant to the GuidED Terms of Service, last updated June
            1, 2021, which govern the use of GuidED, including any content, functionality and services offered on or
            through www.guided.ca or any other website through which GuidED makes its services available (the
            “Website”), and to any mobile, tablet and other smart device applications, and application program
            interfaces (the “Application”) (collectively, the “Services”). All Adventures booked via the Services create
            an agreement between registered users seeking adventures (“Travelers”) and other registered users
            offering authentic adventures in the community (“Guides”). Guides can use the Services to publish
            experiences and excursions in their fields of expertise (“Adventures”). This Traveler Release and Waiver
            must be signed as a condition precedent to any Traveler participating in any Adventure offered through
            the Services. Any terms not defined herein have the meaning given to them in the Terms of Service.
            Your access to and use of the Services and ability to participate in any Adventure is conditioned upon
            compliance with the Terms of Service and your understanding and agreement that GuidED Tobermory
            Inc. (the “Company”) is merely a facilitator providing an online marketplace connecting users, and that
            the Company is not a participant in any relationship between users, Guides or Travelers, nor is it a party
            to any contractual relationship between a Guide and a Traveler.
            1. ELIGIBILITY
            To participate in an Adventure, I understand that my host (Guide) and the Company require me to accept
            this Traveler Release and Waiver, which is effective between me and my host (Guide) and the Company
            as of the date when I first book or participate in an Adventure, whichever happens first.
            I represent that I am 18 years of age or older. If I am bringing a minor as a Traveler I acknowledge and
            agree that I am solely responsible for the supervision of that minor through the duration of the Adventure
            and I have read the Traveler Release and Waiver and agree to it on the minor’s behalf. If I book an
            Adventure on behalf of other Travelers I ensure and I represent and warrant that each Traveler has read
            and agreed to this Traveler Release and Waiver and has signed it before participating in the Adventure
            and it therefore applies to each of them as if the reference to me was a reference to him or her.
            2. TO PARTICIPATE IN AN ADVENTURE
            CAREFULLY READ THIS TRAVELER RELEASE AND WAIVER INCLUDING THE ELIGIBILITY
            REQUIREMENTS AND WAIVER OF LIABILITY PROVISIONS. Complete and sign this document.
            
            3. ACKNOWLEDGEMENT AND ASSUMPTION OF RISKS
            I acknowledge that participating in an Adventure involves many inherent risks, dangers and hazards
            including but not limited to: 1) serious personal injury, discomfort, illness, including sickness, physical
            injury, disability, permanent paralysis and possible loss of life; 2) injury caused by the negligence of other
            Explorers or registered users of the Services, including the Local and any other third party; and 3) risks
            of damage to or loss of personal property.
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, I KNOWINGLY, VOLUNTARILY AND
            FREELY ASSUME ALL RISKS, BOTH KNOWN AND UNKNOWN, ASSOCIATED WITH OR ARISING
            FROM MY PARTICIPATION IN EACH ADVENTURE, EVEN IF THOSE RISKS ARISE FROM THE
            NEGLIGENCE OR CARELESSNESS OF THE GUIDE, THE TRAVELER, THE COMPANY, OR OTHERS,
            OR FROM DEFECTS IN THE EQUIPMENT, PREMISES, OR FACILITIES USED DURING THE
            ADVENTURE, OR OTHERWISE AND I ASSUME ALL AND FULL RESPONSIBILITY FOR PARTICIPATING
            IN THE ADVENTURE.
            4. RELEASE AND WAIVER OF LIABILITY
            I acknowledge and agree that I have reasonably assessed the risks involved in the Adventure and have
            made an informed and voluntary choice to participate; that I alone, and not my host (Guide) or the
            Company, am responsible for determining my fitness for participating in the Adventure and I fully
            understand any and all directions and warnings presented to me; I will not participate in any Adventure
            when I have a physical, medical or mental limitation or disability or when I am aware or should
            reasonably be aware of any factors that may limit me or prevent me from participating safely in the
            Adventure; and that I will act reasonably and responsibly and will comply with any rules, instructions,
            conditions, directions or precautions provided to me in the circumstances and associated with the
            Adventure and if I notice a hazard or danger I will stop participating immediately.
            As a condition of participation, I release and promise not to sue the Guide, and/or the Company and its
            affiliated companies, vendors, advertising, promotion and public relations agencies, co-sponsoring
            companies and their affiliates and agencies, and all officers, directors, employees and agents of the
            aforesaid entities (collectively, the “Releasees”), for any and all claims, demands, causes of action,
            damage, loss (whether economic or non-economic), expenses, costs, or liability of any nature
            whatsoever that I have or may have in the future INCLUDING ANY CLAIMS ARISING FROM ANY
            CAUSE WHATSOEVER, INCLUDING NEGLIGENCE, GROSS NEGLIGENCE, BREACH OF
            CONTRACT, BREACH OF OCCUPIERS LIABILITY LEGISLATION, BREACH OF ANY STATUTORY
            OR OTHER DUTY OF CARE OR ANY OTHER DUTY ON THE PART OF THE RELEASEES
            INCLUDING THE FAILURE ON THE PART OF THE RELEASEES TO TAKE REASONABLE STEPS TO
            SAFEGUARD OR PROTECT ME FROM THE RISKS, DANGERS AND HAZARDS ARISING FROM OR
            IN CONNECTION WITH MY PARTICIPATION IN THE ADVENTURE, WHETHER BASED ON
            WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) PRODUCT LIABILITY OR ANY
            OTHER LEGAL THEORY or for any costs and other expenses, including attorneys’ fees, relating to,
            arising from or in connection, directly or indirectly, with my participation in the Adventure. In no event
            shall the Releasees be liable to me or my next of kin, or anyone acting on my behalf for acts or
            omissions arising out of or related to the Adventure or my participation in the Adventure. I FREELY
            ACCEPT AND FULLY ASSUME ALL SUCH RISKS, DANGERS AND HAZARDS AND THE
            POSSIBILITY OF PERSONAL INJURY, DEATH, PROPERTY DAMAGE AND LOSS RESULTING
            THEREIN.
            I intend this Traveler Release and Waiver to be a complete and unconditional release of all liability to the
            greatest extent allowable by law. I agree that if any portion of this Traveler Release and Waiver is held to
            be invalid, the balance shall continue in full force and effect.
            
            5. INDEMNIFICATION
            I agree that if, despite this Traveler Release and Waiver, I or anyone on my behalf, makes a claim against
            any of the Releasees, relating to an Adventure, I will indemnify, defend and hold the Releasees harmless
            from any and all claims, demands, causes of action, damage, loss (whether economic or non-economic),
            expenses, costs, or liability of any nature whatsoever and for any costs and other expenses, including
            attorneys’ fees, relating to, arising from or in connection, directly or indirectly, with my participation in
            the Adventure.
            6. DISCLAIMER
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, GUIDES PROVIDE THE ADVENTURE “AS IS,”
            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE
            FOREGOING GUIDES EXPRESSLY DISCLAIM ANY WARRANTIES OF SAFETY, FITNESS FOR A
            PARTICULAR PURPOSE, QUIET ENJOYMENT, AND AS TO THE ADEQUACY OF THE DIRECTIONS
            AND WARNINGS PROVIDED.
            7. CERTIFICATION AND SIGNATURE
            I certify that the information provided is correct and that I have carefully read, understand and accept the
            Traveler Release and Waiver. My signature indicates my understanding and assumption of the risks and
            my voluntary participation in the Adventure. I understand that by signing it I will WAIVE AND GIVE UP
            IMPORTANT LEGAL RIGHTS, including the right to sue. I have freely and voluntarily elected to assume
            all of these dangers and risks, to give up important legal rights as set out in this document, and to
            continue to participate in the Adventure and I thereby RELEASE, WAIVE AND FULLY DISCHARGE the
            Releasees from any and all claims and liabilities of any kind or nature as set out in this document. This
            Agreement will be binding upon my heirs, next of kin, executors, administrators, assigns and
            representatives, in the event of my death or incapacity.
            In case of an emergency, I do hereby authorize and consent to any medical treatment or care deemed
            advisable.
            This waiver and release of liability will be construed broadly to provide a release and waiver to the
            maximum extent possible under the applicable law and if any portion of this Traveler Release and Waiver
            is held to be invalid by a court of law, then it is agreed and intended that all the remaining portions of this
            Traveler Release and Waiver shall continue in full force and effect. I expressly agree that this Traveler
            Release and Waiver shall be construed and enforced in accordance with the laws of Canada and I
            hereby submit to the exclusive jurisdiction of the Courts sitting in Toronto, Ontario, Canada.
            I confirm that I am 18 years of age or older, that I have read this document thoroughly and that I agree to
            its terms.
            My signature below indicates that I have read, understand and have freely signed this agreement and
            that by signing I will WAIVE AND GIVE UP IMPORTANT LEGAL RIGHTS. I understand that the Guide,
            the Company and other Releasees are relying on MY FULL RELEASE AND WAIVER OF ALL
            CLAIMS when allowing me to participate in the Adventure. This form is necessary for me to participate
            in an Adventure.
            I understand I will not be allowed to participate without this form.`,
          }),
        ])
        .execute();
    }

    const countCancellationPolicy = await connection
      .createQueryBuilder()
      .select()
      .from(TermsAndCondition, 'TermsAndCondition')
      .where('"TermsAndCondition"."type" = :type', { type: 'cancellation policy' })
      .getCount();

    if (countCancellationPolicy === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(TermsAndCondition)
        .values([
          plainToClass(TermsAndCondition, {
            type: 'cancellation policy',
            description: `This Cancellation Policy is made pursuant to the GuidED Terms & Conditions (“Terms of Use
              Agreement”), which govern the use of GuidED, including any content, functionality and
              services offered on or through GuidED, and to any mobile, tablet and other smart device
              applications, and application program. All Adventures (as defined below) booked via the
              Services create an Agreement between registered users seeking adventures (“Travelers”)
              and other registered users offering authentic adventures in the community (“Guides”).
              Guides can use the Services to publish experiences and excursions in their fields of
              expertise (“Adventures”), which can then be booked by Travelers who wish to participate
              in that Adventure.
              Your access to and use of the Services is condition upon compliance with the Terms of Use
              Agreement and your understanding and agreement that the Company is merely a facilitator
              providing an online marketplace connecting users, and that the Company is not a
              participant in any relationship between users, Guides or Travelers, nor is it a party to any
              contractual relationship between a Guide and a Traveler.
              This Cancellation Policy is incorporated into and forms part of the Terms of Use
              Agreement, and any Traveler or Guide participating in any Adventure offered through the
              Services is bound by the Cancellation Policy. Any terms not defined herein have the
              meaning given to them in the Terms of Use Agreement.
              1. Scope
              1.1 All Adventures and bookings are subject to the Cancellation Policy.
              1.2 Guides and Travelers are responsible for any variations to a booking (“Variations”)
              and agree to pay any costs associated with such Variations.
              2. Refunds
              2.1 The Company will provide refunds in accordance with this Cancellation Policy which
              may include consideration of Exceptional Circumstances as defined herein.
              2.2 The Company reserves the right, in its sole discretion, to cancel an Adventure and
              make a refund or payout decision, including for any of the reasons set out in Terms of
              Use Agreement, this Cancellation Policy, or if it believes in good faith that it is necessary
              to (a) avoid significant harm to the Company, registered users, third parties or property,
              or (b) comply with requirements, guidelines and recommendations of federal, provincial
              and municipal governments, including without limitation during times of heightened risk
              of transmission of COVID-19.
              
              2.3 If a Traveler cancels an Adventure, the following penalties are the standard
              penalties that will apply, unless there are circumstances which dictate otherwise
              (“Exceptional Circumstances”):
              2.3.1 Subject to Section 2.3.3 below, if cancelled within 24 hours of booking an
              Adventure, there is no penalty and the Company will refund the fee paid for the
              Adventure (the “Adventure Fee”);
              2.3.2 If cancelled more than 7 days before the start time of the Adventure, there is no
              penalty and the Company will refund the Adventure Fee;
              2.3.3 Notwithstanding Section 2.3.1 above, if cancelled within 7 days of the start time of
              the Adventure, there will be a 50% refund.
              2.3.3.1 If cancelled within 48 hours of the start time of the Adventure, there will be no
              refund.
              2.4 If a Traveler is entitled to a refund upon cancellation, the Company will make the
              payment back to the Traveler after deducting any applicable penalty. If any amount is
              owed to the Guide, the Company will make the appropriate Payout to the Guide, unless
              there are Exceptional Circumstances.
              2.5 If a Guide cancels an Adventure, the following provisions govern the cancellation,
              unless there are Exceptional Circumstances:
              2.5.1 The Traveler will receive a full refund of the Adventure Fee for the Adventure;
              2.5.2 If the Guide makes a cancellation more than 48 hours before the start time of the
              Adventure, there will be no penalty;
              2.5.3 If the Guide makes a cancellation within 24 hours of the start time of the
              Adventure, the Guide will be charged a penalty of 20%, with the penalty to be deducted
              from future Payouts;
              2.5.4 The Guide’s calendar will be blacked out for the dates on which they have
              cancelled so that they will no longer be able to host an Adventure on that date; and
              2.5.5 An automatic review/rating will be posted to their page citing the cancellation.
              2.6 If a Guide cancels within 24 hours of the start time of an Adventure more than 3
              times they may be removed from the Services.
              2.7 If the Company cancels an Adventure pursuant to the Terms of Use Agreement or
              any of the Company’s Policies, including for Exceptional Circumstances, you agree that
              
              the Company is not liable for such cancellation or refunds, aside from its obligations to
              remit refunds or Payouts pursuant to the Terms of Use Agreement or this Cancellation
              Policy.
              2.8 If you owe additional amounts due to Variations or cancellations, you agree that the
              Company may collect such amounts by charging the same financial instrument used to
              make your booking.
              2.9 The Payment and Payout Terms will apply to any payments, refunds or transactions
              related to a cancellation or Variation.
              3. Exceptional Circumstances
              3.1 The following circumstances will be considered Exceptional Circumstances which
              are out of a Guide’s or Traveler’s control and give the Company the discretion and
              permission to override the Cancellation Policy and make refund decisions, or to waive
              cancellation penalties:
              3.1.1 Unexpected death or serious illness of a Guide, Traveler or immediate family
              member;
              3.1.2 Serious injury;
              3.1.3 Natural disaster or severe weather that impacts the Adventure;
              3.1.4 Travel restrictions that arise outside of a Traveler’s or Guide’s control, including
              without limitation any travel restrictions imposed by governmental authorities in
              response to the COVID-19 pandemic;
              3.1.5 Government-mandated obligations issued after the time of booking, including
              without limitation any requirements, guidelines and recommendations of federal,
              provincial and municipal governments imposed in response to the COVID-19 pandemic;
              3.1.6 Unforeseen circumstances that impact the ability to safely engage in the
              Adventure; or
              3.1.7 Any additional circumstances deemed relevant by the Company, in its sole
              discretion.
              4. General
              4.1 This Cancellation Policy does not constitute an offer to insure and it is not an
              insurance contract, nor does it take the place of insurance obtained or obtainable by the
              Traveler or Guide. No registered user has paid any premium in respect of the
              Cancellation Policy.
              
              4.2 The benefits provided under this Cancellation Policy are not assignable or
              transferable by you.
              4.3 The Company reserves the right, at its sole discretion, to modify or replace this
              Cancellation Policy at any time. If a revision is material, which is to be determined by
              the Company at its sole discretion, the Company will provide at least 30 days’ notice on
              the Website or Application prior to any new terms taking effect. Your continued access
              to or use of the Services after any revisions become effective, will mean that you accept
              and agree to be bound by the revised terms. If you do not agree to the new terms, you
              are no longer authorized to use the Services and should refrain from doing so.
              4.4 This Cancellation Policy, together with the Terms of Use Agreement and the Payment
              and Payout Terms, constitutes the entire agreement between you and the Company
              regarding cancellations and refunds and supersedes any and all prior understandings or
              agreements between you and the Company regarding cancellations and refunds.
              
              4.5 If you have any questions about these Terms, please contact the Company by e-
              mail at cancellations@guided.ca`,
          }),
        ])
        .execute();
    }

    const countPaymentAndPayoutTerms = await connection
      .createQueryBuilder()
      .select()
      .from(TermsAndCondition, 'TermsAndCondition')
      .where('"TermsAndCondition"."type" = :type', { type: 'payment and payout terms' })
      .getCount();

    if (countPaymentAndPayoutTerms === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(TermsAndCondition)
        .values([
          plainToClass(TermsAndCondition, {
            type: 'payment and payout terms',
            description: `Last update: August 31, 2021
            These Payment and Payout Terms are made pursuant to the GuidED Terms &
            Conditions (“Terms of Service”), which govern the use of GuidED, including any
            content, functionality and services offered on or throughwww.guided.ca, and to any
            mobile, tablet and other smart device applications, and application program interfaces
            (the “Application”) (collectively, the “Services”). All Adventures booked via the Services
            create an Agreement between registered users seeking adventures (“Travelers”) and
            other registered users offering authentic adventures in the community (“Guides”).
            Guides can use the Services to publish experiences and excursions in their fields of
            expertise (“Adventures”), which can then be booked by Travelers who wish to
            participate in that Adventure.
            Your access to and use of the Services is conditioned upon compliance with the Terms
            of Service and your understanding and agreement that the Company is merely a
            facilitator providing an online marketplace connecting users, and that the Company is
            not a participant in any relationship between users, Guides or Travelers, nor is it a party
            to any contractual relationship between a Guide and a Traveler.
            These Payment and Payout Terms are incorporated into, and form part of the Terms of
            Use Agreement, and any Traveler or Guide participating in any Adventure offered
            through the Services, is bound by these Payment and Payout Terms. These Payment
            and Payout Terms constitute a legally binding agreement between you and the
            Company and govern the Payment Services (as defined herein). Any terms not defined
            herein have the meaning given to them in the Terms of Use Agreement.
            1. Fees
            1.1 The Company may charge fees to Guides (“Guide Fees”) and/or to Traveler
            (“Traveler Fees”) (collectively, “Fees”) as consideration for the use of the Services. Fees
            will be displayed prior to publishing or booking an Adventure.
            1.2 Guides are responsible for setting the fee for the Adventure they intend to host (the
            “Adventure Fee”).
            
            1.3 Guide Fees are 5% of the Adventure Fees. The Company reserves the right to
            change the Fees at any time and adequate notice will be provided prior to such change
            becoming effective.
            1.3.1 Traveler Fees are 15% of the Adventure Fees. The Company reserves the right to
            change the Fees at any time and adequate notice will be provided prior to such change
            becoming effective.
            1.3.2. Travelers will be required to donate a minimum of $1.00 to conservation for every
            booking. This is called the 1% For the Planet Donation.
            1.4 The Company will collect the Fees charged pursuant to these Payment and Payout
            Terms and the Terms of Use Agreement. Where applicable, the Company may also
            collect taxes in respect of the Fees.
            1.5 A Guide’s Payout for an Adventure will be the Adventure Fee less applicable Guide
            Fees and taxes. (if taxes are applicable)
            1.6 All transactions will be processed in Canadian dollars.
            1.7 The Company may round up or round down any amounts that are payable, to the
            nearest whole number.
            1.8 You are responsible for paying any and all Fees that you owe or have incurred via
            your use of the Services.
            1.9 Unless otherwise provided Fees are non-refundable.
            2. Payment Collection
            2.1 The Company will provide payment services to registered users via a third party
            payment service provider called STRIPE, including for payment collection and payouts
            in connection with the Services, for processing refunds and for storing, managing and
            processing personal information associated with any of the foregoing (“Payment
            Services”).
            2.2 Each Guide collecting payment for Adventures provided via the Services hereby
            appoints the Company, and STRIPE, as their limited payment collection agents solely
            for the limited purpose of accepting funds from Travelers purchasing Adventures. Each
            Guide agrees that payments made through the Payment Services will be considered the
            same as payments made directly to the Guide, and the Guide will provide the
            Adventures to Traveler in the agreed upon manner as if they had received payment
            directly.
            
            2.3 Each Guide agrees that the Company’s obligation to pay the Guide is subject to and
            conditional upon successful receipt of the Adventure Fees from the Travelers. The
            Company only guarantees payouts to Guides in respect of payments that have been
            successfully received from Traveler in accordance with the Terms of Use Agreement and
            these Payment and Payout Terms. In accepting appointment as the limited payment
            collection agent of the Guide, the Company does not assume any liability for any acts or
            omissions of the Guide.
            2.4 Each Traveler acknowledges and agrees that the Company and STRIPE act as the
            Guide’s collection agent for the limited purpose of accepting payments from the Traveler
            for each Adventure booked and that this does not make the Company a party to any
            agreement between a Guide and a Traveler.
            2.5 If the Company is unable to collect any amounts you owe under the Terms of Use
            Agreement and these Payment and Payout Terms, it may engage in collection efforts to
            recover such amounts from you. Amounts will be considered to be overdue when 90
            days have passed since the first attempt to charge the funds owed was made. Amounts
            not collected within the foregoing time frame will be deemed to be in default.
            2.6 The Company may modify the Payment Services and introduce new Payment
            Services from time to time.
            2.7 You must not use the Payment Services except as authorized by Canadian law, the
            laws of the jurisdiction in which you reside and any other applicable laws.
            3. Payments and Payout
            3.1 Payments and Payouts will involve the use of the third-party payment service
            provider STRIPE. STRIPE may charge additional fees and impose additional terms and
            conditions when processing payments and payouts. The Company is not responsible for
            any such fees and disclaims all liability in this regard. You are responsible for reviewing
            such additional terms and conditions.
            3.2 Via the Payment Services, you may link financial instruments to your GuidED
            STRIPE account in order to make and receive payments. For example, you may link a
            credit card, debit card, PayPal account, direct deposit, or a prepaid card. Any financial
            instrument information that is linked to your account will be stored, managed and
            processed via STRIPE and not by the Company.
            3.3 When you link financial instruments to your GuidED STRIPE account you will be
            asked to provide billing information, including but not limited to your name, billing
            address and financial instrument information. You must provide accurate, current and
            complete information and you agree to ensure that such information is current at all
            
            times. You are solely responsible for the accuracy and completeness of such
            information.
            3.4 When you add a financial instrument, STRIPE may verify your identity and your
            financial instrument information in accordance with its terms and conditions and
            policies, including by requiring valid government ID and by processing a $1.00
            verification charge, which is immediately reversed.
            3.5 The Payment Services may contain links to third-party websites or resources which
            may be subject to different terms and conditions and privacy practices. You are
            responsible for reviewing these independently. The Company is not responsible or liable
            for the availability or accuracy of these third-party services.
            3.6 The Company agrees to take steps to rectify any payment processing errors that it
            becomes aware of or that you bring to the Company’s attention.
            4. Cancellations and Refunds
            4.1 All refunds will be processed by the Company and STRIPE in accordance with
            the Cancellation Policy.
            
            5. Taxes
            5.1 Guides are solely responsible for determining obligations to report, collect, remit or
            include applicable taxes in their Payouts (Adventure Fees less Guide Fees).
            5.2 Tax laws may require the Company to collect appropriate tax information from
            Guides, or to withhold Payouts to Guides, or both. If the Guide fails to provide the
            documentation required by the Company to alleviate its obligations in respect of taxes,
            the Company reserves the right to freeze all Payouts, withhold any amounts required by
            law, or both, until the matter is resolved.
            5.3 You understand that any appropriate government agency, department or authority
            may require taxes to be collected from Travelers or Guides based on Adventure Fees
            and Payouts, respectively, and to be remitted to the appropriate agency.
            6. General
            6.1 The Company reserves the right, at its sole discretion, to modify or replace these
            Payment and Payout Terms at any time. If a revision is material, which is to be
            determined by the Company at its sole discretion, the Company will provide at least 30
            
            days’ notice on the Website or Application prior to any new terms taking effect. Your
            continued access to or use of the Services after any revisions become effective, will
            mean that you accept and agree to be bound by the revised terms. If you do not agree
            to the new terms, you are no longer authorized to use the Services and should refrain
            from doing so.
            6.2 These Payment and Payout Terms, together with the Terms of Use Agreement ,
            the Privacy Policy , the Cancellation Policy and any other document or policy referred to
            herein or applicable to your use of the Services, constitutes the entire agreement
            between you and the Company regarding payments and payouts in connection with the
            Services, and supersedes any and all prior understandings or agreements between you
            and the Company regarding Payments and Payouts in connection with the Services.
            6.3 If you have any questions about these Payment and Payout Terms, please contact
            the Company by e-mail at info@guided.ca.`,
          }),
        ])
        .execute();
    }

    const countLocalLawsAndTaxes = await connection
      .createQueryBuilder()
      .select()
      .from(TermsAndCondition, 'TermsAndCondition')
      .where('"TermsAndCondition"."type" = :type', { type: 'local laws and taxes' })
      .getCount();

    if (countLocalLawsAndTaxes === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(TermsAndCondition)
        .values([
          plainToClass(TermsAndCondition, {
            type: 'local laws and taxes',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet in lectus in maximus. Sed congue fermentum enim, in venenatis leo iaculis sed. Pellentesque egestas felis tellus, sed vehicula metus elementum non. Nulla efficitur cursus justo sagittis condimentum. Integer blandit ut mauris vitae consequat. Vestibulum massa tortor, ornare eu tellus sit amet, blandit ornare nulla. Vivamus egestas maximus purus, ac finibus tellus. Curabitur lacus nulla, dictum in turpis ut, iaculis tincidunt diam.

            Aenean at risus lacus. Ut a neque ac elit rutrum fermentum et facilisis tortor. Quisque eu nisi et ante rhoncus feugiat. Praesent pharetra iaculis sapien, sed dictum orci porttitor vel. Nullam euismod sodales tincidunt. Suspendisse malesuada sodales nulla a suscipit. Aliquam erat volutpat. Etiam sit amet sagittis dui, ut auctor massa. Phasellus porttitor dui ut nisi luctus porttitor. Aliquam bibendum quam lorem, id imperdiet urna vestibulum in. Sed vulputate molestie sapien, nec lacinia elit eleifend nec. Vestibulum nec convallis leo, sed aliquam urna. Praesent maximus nisi non lorem blandit ultricies. Duis at convallis purus. In egestas facilisis elit, vitae interdum lorem lacinia nec. Proin vel lectus sed orci porta tristique vehicula nec sapien.
            
            Phasellus eget turpis lobortis, venenatis mi sit amet, laoreet justo. Nullam malesuada ac eros non semper. Nulla sodales turpis vitae finibus luctus. Aliquam aliquet consectetur massa. Vestibulum bibendum nunc eros, nec semper erat consequat eget. Suspendisse potenti. Cras sit amet felis molestie, lacinia lectus quis, lacinia orci. Sed non vestibulum sapien. Proin fermentum fringilla lectus. Praesent imperdiet accumsan efficitur. Vivamus fermentum commodo magna, nec facilisis dui lobortis id.
            
            Proin suscipit aliquam elit, in rhoncus libero egestas et. Maecenas sed lectus convallis, mollis nulla vel, consequat diam. Curabitur ultrices nisl neque, vitae mollis nibh pharetra sed. Nulla neque nulla, congue ac lacus non, consequat sagittis justo. Nam quis cursus nisi. Donec blandit accumsan odio et blandit. Nam eros metus, fermentum nec fringilla a, iaculis non ligula. Curabitur sagittis tincidunt magna, a bibendum purus egestas nec.
            
            Praesent eleifend ut risus ac tempus. Donec in nibh id est dictum tincidunt. Nulla porta arcu ipsum. Aliquam erat volutpat. In ipsum ligula, consequat quis eros vitae, hendrerit aliquam sapien. In varius, dolor ac elementum imperdiet, ex nisi sodales diam, tincidunt tempus nulla velit in eros. Fusce euismod venenatis fermentum. In vehicula faucibus tristique. Aliquam a lacus nec massa scelerisque egestas sed a felis.`,
          }),
        ])
        .execute();
    }
  }
}
