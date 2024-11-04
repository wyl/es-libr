import dotenv from "dotenv";
dotenv.config();
import { indexMapping, initGlobal } from "./src/global";
import { LiteTransform } from "./src/core/lite-transform";
import { getMemory, setMemory } from "./src/core/memory";

const p = {
  data: {
    resolution: {
      context: "art",
      remainingPath: "",
      publication: {
        name: "zaobao",
        href: "https://zaobao.cue-staging.sphnet.com.sg/",
        features: [
          { key: "com.escenic.cue.spellcheck.language", value: "zh-CN" },
          {
            key: "publication.previewURL",
            value: "https://zaobao.preview.cue-staging.sphnet.com.sg/",
          },
        ],
      },
      section: {
        name: "Culture",
        uniqueName: "lifestyle_culture",
        directoryName: "culture",
        parent: {
          name: "Lifestyle",
          uniqueName: "lifestyle",
          directoryName: "lifestyle",
          parent: {
            name: "Home",
            uniqueName: "ece_frontpage",
            directoryName: "frontpage",
          },
        },
        href: "https://zaobao.cue-staging.sphnet.com.sg/lifestyle/culture/",
        parameters: [],
      },
    },
    context: {
      typeName: "OnlineStory",
      id: "1199956",
      href: "https://zaobao.cue-staging.sphnet.com.sg/lifestyle/culture/story20240726-1199956",
      urlPath: "/lifestyle/culture/story20240726-1199956",
      urlPathHistory: [],
      type: "onlineStory",
      source: "ece-auto-gen",
      sourceId: "de37bd4a-dfe4-455c-92af-b73a2dcfe702",
      created: "2024-07-26T07:09:12.000Z",
      updated: "2024-07-26T07:10:15.000Z",
      lastmodified: "2024-07-26T07:12:29.000Z",
      edited: "2024-07-26T07:12:29.000Z",
      expired: null,
      scheduled: null,
      title: "Playlist (unlisted)",
      baseStory: null,
      previewSourceId: "",
      sections: [
        {
          name: "Culture",
          uniqueName: "lifestyle_culture",
          directoryName: "culture",
          href: "https://zaobao.cue-staging.sphnet.com.sg/lifestyle/culture/",
          parent: {
            name: "Lifestyle",
            uniqueName: "lifestyle",
            directoryName: "lifestyle",
            parent: {
              name: "Home",
              uniqueName: "ece_frontpage",
              directoryName: "frontpage",
            },
          },
          parameters: [],
        },
      ],
      tags: [
        {
          id: "tag:zaobao-keywords@sph.com.sg,2022:%E6%A2%A6%E5%9C%862024",
          uri: null,
          type: "keyword",
          name: "梦圆2024",
          urlPath: "",
          urlPathHistory: [],
          sections: [],
          aliases: [],
          fields: [],
          parent: null,
        },
      ],
      media: [],
      attachments: [],
      relatedStories: [],
      relatedContributorProfile: [],
      campaignReference: [],
      ogImages: [],
      authors: [
        {
          id: "14842",
          name: "Loh Chan Wai",
          firstname: "Loh",
          surname: "Chan Wai",
          username: "bryanloh",
          email: "bryanloh@sph.com.sg",
          source: "okta",
          sourceId: "00u402ictimZDxzkC1d7",
          updated: "2023-04-27T03:45:51.000Z",
          edited: "2023-04-27T03:45:51.000Z",
          profiles: [],
        },
      ],
      byline: { customByline: "", translator: "" },
      sponsorship: {
        sponsorCheckbox: false,
        sponsorDateStart: "",
        sponsorDateEnd: "",
        sponsorName: "",
      },
      paywall: {
        printFlag: false,
        automateFlag: null,
        contentAccess: "0",
        copyright: "SPH",
        agencySource: "",
      },
      customBlurb: null,
      storyContent: { blurb: "", shortURL: "", stockCode: "" },
      displaySetting: {
        zbsgFlag: true,
        zbcomFlag: true,
        hideAuthorFlag: false,
        displayHeadline: "",
        displayHeadlineZBCom: "",
        englishHeadline: "",
        externalURL: "",
        displayType: "default",
        displayAssets: "",
        hasAffiliateLabel: false,
        displayAssetsMultiple: ["has_main_image"],
        showRelatedLinksAndNewsletterSignupForm: true,
        hasUpdatedTimeDisplayed: false,
        noDuplication: false,
        hideFromBreakingNewsListing: false,
        hideFromSectionListing: false,
        sticky: false,
        publishToGoogleAMP: true,
        hideMedia: false,
        hideOutbrain: false,
        isWinnerPage: false,
      },
      campaignSetting: { campaignDisplay: "ARTICLES", campaignType: "REGULAR" },
      creditInfo: { compiledBy: "", producer: "" },
      seoFields: {
        metaTitle: "",
        metaDescription: "",
        metaRobots: "0",
        canonicalUrl: "",
      },
      ogFields: { ogTitle: "", ogDescription: "" },
      cueFields: { noDuplication: false },
      others: {
        storyThread: "",
        storyThreadMetadata: "[]",
        storySource: "",
        storySourceMetadata: "[]",
        authoring: "",
        removeAuthor: false,
        editorialTag: "",
        customUrlAlias: false,
        urlAlias: "",
        urlHistory: ["/lifestyle/culture/story20240726-1199956"],
      },
      storyline: [
        "ac5b671f-4419-4894-a596-ec920e1ff495",
        "a9489505-c4fa-416d-a69e-9479e1436944",
        "51ba00eb-e42e-441a-9739-8c6e29a18aef",
        "6b9514f0-c64a-49cc-a1cc-2bbe1f7cec5b",
        "a4e7c8b5-7a17-40b9-92a0-ceec28a99a71",
        "518c2b03-f726-4fb8-a5f7-469572c259a2",
      ],
      embedcodes: [],
      elements: [
        {
          id: "ac5b671f-4419-4894-a596-ec920e1ff495",
          type: "slug",
          fields: [],
        },
        {
          id: "a9489505-c4fa-416d-a69e-9479e1436944",
          type: "headline",
          fields: [
            { name: "headline", value: "Playlist (unlisted)", annotations: [] },
          ],
        },
        {
          id: "51ba00eb-e42e-441a-9739-8c6e29a18aef",
          type: "standfirst",
          fields: [],
        },
        {
          id: "6b9514f0-c64a-49cc-a1cc-2bbe1f7cec5b",
          type: "media",
          fields: [],
          children: ["0eda5b10-f291-4780-a6ad-f35cd81eb3be"],
        },
        {
          id: "a4e7c8b5-7a17-40b9-92a0-ceec28a99a71",
          type: "podcast_wrapper",
          fields: [
            {
              name: "podcastWrapperSource",
              value:
                '{"source":"https://omny.fm/shows/lee-kuan-yew-hard-truths/playlists/podcast","size":"wide-simple"}',
              annotations: [],
            },
          ],
        },
        {
          id: "518c2b03-f726-4fb8-a5f7-469572c259a2",
          type: "paragraph",
          fields: [
            {
              name: "paragraph",
              value:
                "《李光耀：新加坡赖以生存德硬道理》是李光耀第三本回忆录，面向年轻、更有批判性的国民所关切的课题。每一章除了引言介绍所讨论的课题外，访谈内容都以问答的方式呈现。从新加坡的地缘政治现实，执政党和领导团队的作风， 到种族和宗教的争议性课题，李光耀都以他独特的率直，一一回应。",
              annotations: [],
            },
            { name: "displayDropCap", booleanValue: false },
            { name: "disableAutolink", booleanValue: true },
          ],
        },
        {
          id: "0eda5b10-f291-4780-a6ad-f35cd81eb3be",
          type: "image",
          fields: [
            { name: "caption", value: "听新闻", annotations: [] },
            { name: "alignment", value: "full", annotations: [] },
            { name: "cropSelection", value: "landscape", annotations: [] },
            { name: "displayCaption", booleanValue: true },
            { name: "displayFullWidth", booleanValue: false },
            { name: "convertToParallax", booleanValue: false },
            { name: "titleColor", value: "#000000", annotations: [] },
          ],
          relation: {
            id: "1199955",
            source: "ece-auto-gen",
            sourceId: "c2298d1f-d9b2-477c-9211-3ef74f16f0f1",
            type: "picture",
            binaryLink:
              "http://internal-alb-cue-presentation-cue-stg-108686468.ap-southeast-1.elb.amazonaws.com:8080/webservice/escenic/binary/1199955/2024/7/26/15/%25E5%2590%25AC%25E6%2596%25B0%25E9%2597%25BB-omny-cover.jpg",
            alternates: {
              poi: { top: 0, left: 0, auto: null },
              com_escenic_master: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                auto: null,
              },
              ORIGINAL: { x: 0, y: 0, width: 0, height: 0, auto: null },
              BASE_LANDSCAPE: { x: 0, y: 0, width: 0, height: 0, auto: false },
              BASE_PORTRAIT: { x: 0, y: 0, width: 0, height: 0, auto: null },
              BASE_SQUARE: { x: 0, y: 0, width: 0, height: 0, auto: null },
              BASE_SQUARE_30_26: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                auto: null,
              },
              BASE_WIDE: { x: 0, y: 0, width: 0, height: 0, auto: null },
              BASE_FREE: { x: 0, y: 0, width: 0, height: 0, auto: null },
            },
            fields: {
              caption: "",
              credit: "",
              com_escenic_defaultmetadata: [
                { key: "last-modified", value: "1721977577087" },
                { key: "content-length", value: "56390" },
                { key: "mime-type", value: "image/jpeg" },
                { key: "format", value: "JPEG" },
                { key: "width", value: "500" },
                { key: "file-name", value: "听新闻-omny-cover.jpg" },
                { key: "com.escenic.binary.version", value: "2" },
                { key: "original-mime-type", value: "image/jpeg" },
                { key: "height", value: "500" },
              ],
              original: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/ORIGINAL/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1200,
                height: -1,
              },
              portrait: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_PORTRAIT/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: 2026,
              },
              landscape: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_LANDSCAPE/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: 760,
              },
              landscape480: {
                href_full:
                  "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/LANDSCAPE_480/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/LANDSCAPE_480/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 480,
                height: 320,
              },
              landscape1024: {
                href_full:
                  "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/LANDSCAPE_1024/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/LANDSCAPE_1024/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1024,
                height: 682,
              },
              square: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_SQUARE/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: 1140,
              },
              square_30_26: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_SQUARE_30_26/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: 987,
              },
              wide: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_WIDE/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: 485,
              },
              freecrop: {
                url: "https://img.zaobao.cue-staging.sph.com.sg/public/incoming/2u8t4q-%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg/alternates/BASE_FREE/%E5%90%AC%E6%96%B0%E9%97%BB-omny-cover.jpg",
                width: 1140,
                height: -1,
              },
              "square-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/9327626117601e77aa8643228d19a59b41a66d2b6458c50c15519c2bb05ee0eb",
                width: 1140,
                height: 1140,
              },
              "landscape1024-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/56d12d0cc3d9f05fec9280b62b8dc4472ebeac3d9ba0f2f123cbb63311a052fa",
                width: 1024,
                height: 682,
              },
              "landscape480-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/d6a4246849468b3b0420494c86bc3e4b27843e5cb7e188c7d2af5649340bfc7d",
                width: 480,
                height: 320,
              },
              "square_30_26-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/2a66107efef090929b554a859d00a58c1992fa7a6472794cccf1d2ec9741012e",
                width: 1140,
                height: 987,
              },
              "original-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/14367daf4ce43bdeb93b3c1be3f62fc21455097b4049a19b5855a33eb22b0809",
                width: 500,
                height: 500,
              },
              "wide-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/d2e27a613d0759362ea32e58286ea302dd95fee49fbe6b30e9ed49cefbf59f38",
                width: 1140,
                height: 485,
              },
              "portrait-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/d281af9d29fbd29187c9aa0b95a914ec1850c2ade79369f6d9bd042c62c8b86d",
                width: 1140,
                height: 2026,
              },
              "freecrop-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/9327626117601e77aa8643228d19a59b41a66d2b6458c50c15519c2bb05ee0eb",
                width: 1140,
                height: 1140,
              },
              "landscape-caas": {
                url: "https://stg.cassette.sphdigital.com.sg/image/zaobao/f1a027bcdfe30c1b5d8ee4afebea0d2eec9489caeb15b2fb01851dd77d908333",
                width: 1140,
                height: 760,
              },
            },
          },
        },
      ],
      cookUrl:
        "http://internal-alb-cue-present-combined-stg-1143792760.ap-southeast-1.elb.amazonaws.com:8101/zaobao/lifestyle/culture/story20240726-1199956",
    },
  },
  sqsMessage: {
    id: "1199956",
    title: "Playlist (unlisted)",
    authors: ["Loh Chan Wai"],
    operator: "Webservice User",
    homeSectionUrl:
      "http://internal-alb-cue-presentation-cue-stg-108686468.ap-southeast-1.elb.amazonaws.com:8080/webservice/escenic/section/439",
    homeSection: "Culture",
    source: "ece-auto-gen",
    sourceId: "de37bd4a-dfe4-455c-92af-b73a2dcfe702",
    type: "article",
    state: "published",
    publication: "zaobao",
    url: "https://zaobao.cue-staging.sphnet.com.sg/lifestyle/culture/story20240726-1199956",
    cookUrl:
      "http://internal-alb-cue-present-combined-stg-1143792760.ap-southeast-1.elb.amazonaws.com:8101/zaobao/lifestyle/culture/story20240726-1199956",
  },
};

async function main() {
  await initGlobal();
  const mp = indexMapping()["caas-cn-zaobao-online"].mapping();

  const trs = new LiteTransform(p, mp);
  console.log(trs.makeLiteBody());

  setMemory("test", trs.makeLiteBody());
  console.log(getMemory("test"));
}

main();
