import * as T from '@elastic/elasticsearch/lib/api/types'

const mapping: T.IndicesPutMappingRequest = {
  index: 'caas-cn-zaobao-online',
  properties: {
    data: {
      properties: {
        context: {
          properties: {
            // attachments: {
            //   type: 'nested',
            //   properties: {
            //     content: {
            //       properties: {
            //         binary: {
            //           properties: {
            //             filename: {
            //               type: 'keyword',
            //             },
            //             url: {
            //               type: 'keyword',
            //             },
            //           },
            //         },
            //         bucketName: {
            //           type: 'keyword',
            //         },
            //         fields: {
            //           properties: {
            //             byline: {
            //               type: 'text',
            //               term_vector: 'with_positions_offsets',
            //               analyzer: 'text_analyzer',
            //               search_analyzer: 'phrase_analyzer',
            //             },
            //             caption: {
            //               type: 'text',
            //               term_vector: 'with_positions_offsets',
            //               analyzer: 'text_analyzer',
            //               search_analyzer: 'phrase_analyzer',
            //             },
            //             credit: {
            //               type: 'text',
            //             },
            //           },
            //         },
            //         href: {
            //           type: 'keyword',
            //         },
            //         id: {
            //           type: 'keyword',
            //         },
            //         source: {
            //           type: 'keyword',
            //         },
            //         sourceId: {
            //           type: 'keyword',
            //         },
            //         title: {
            //           type: 'text',
            //         },
            //         type: {
            //           type: 'keyword',
            //         },
            //       },
            //     },
            //     href: {
            //       type: 'keyword',
            //     },
            //     summary: {
            //       properties: {
            //         key: {
            //           type: 'text',
            //         },
            //         value: {
            //           type: 'text',
            //           term_vector: 'with_positions_offsets',
            //           analyzer: 'text_analyzer',
            //           search_analyzer: 'phrase_analyzer',
            //         },
            //       },
            //     },
            //   },
            // },
            authors: {
              type: 'nested',
              properties: {
                // edited: {
                //   type: 'date',
                //   ignore_malformed: true,
                // },
                // email: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // firstname: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
                // id: {
                //   type: 'keyword',
                // },
                // name: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
                profiles: {
                  type: 'nested',
                  properties: {
                    content: {
                      properties: {
                        // edited: {
                        //   type: 'date',
                        //   store: true,
                        //   format:
                        //     'date_time||date_time_no_millis||date_hour_minute_second_millis',
                        //   ignore_malformed: true,
                        // },
                        // fields: {
                        //   properties: {
                        //     bio: {
                        //       properties: {
                        //         attributes: {
                        //           type: 'text',
                        //         },
                        //         children: {
                        //           properties: {
                        //             text: {
                        //               type: 'text',
                        //             },
                        //             type: {
                        //               type: 'text',
                        //             },
                        //           },
                        //         },
                        //         type: {
                        //           type: 'text',
                        //         },
                        //       },
                        //     },
                        //     bio_raw: {
                        //       type: 'text',
                        //     },
                        //     designation: {
                        //       type: 'text',
                        //     },
                        //     email: {
                        //       type: 'text',
                        //     },
                        //     name: {
                        //       type: 'text',
                        //     },
                        //     startdate: {
                        //       type: 'date',
                        //       store: true,
                        //       format:
                        //         'date_time||date_time_no_millis||date_hour_minute_second_millis',
                        //       ignore_malformed: true,
                        //     },
                        //     twitterHandle: {
                        //       type: 'text',
                        //     },
                        //   },
                        // },
                        // headshotImage: {
                        //   properties: {
                        //     content: {
                        //       properties: {
                        //         fields: {
                        //           properties: {
                        //             original: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'original-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //             square: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'square-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //             square_320: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'square_320-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //             square_480: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'keyword',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'square_480-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //             square_560: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'square_560-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //             square_80: {
                        //               properties: {
                        //                 height: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                 },
                        //                 width: {
                        //                   type: 'integer',
                        //                   index: false,
                        //                 },
                        //               },
                        //             },
                        //             'square_80-caas': {
                        //               properties: {
                        //                 height: {
                        //                   type: 'long',
                        //                 },
                        //                 url: {
                        //                   type: 'text',
                        //                   fields: {
                        //                     keyword: {
                        //                       type: 'keyword',
                        //                       ignore_above: 256,
                        //                     },
                        //                   },
                        //                 },
                        //                 width: {
                        //                   type: 'long',
                        //                 },
                        //               },
                        //             },
                        //           },
                        //         },
                        //       },
                        //     },
                        //   },
                        // },
                        id: {
                          type: 'keyword',
                        },
                        // source: {
                        //   type: 'text',
                        // },
                        // sourceId: {
                        //   type: 'text',
                        // },
                        // type: {
                        //   type: 'text',
                        // },
                        // typeName: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // updated: {
                        //   type: 'date',
                        //   store: true,
                        //   format:
                        //     'date_time||date_time_no_millis||date_hour_minute_second_millis',
                        //   ignore_malformed: true,
                        // },
                        urlPath: {
                          type: 'text',
                          fields: {
                            keyword: {
                              type: 'keyword',
                              ignore_above: 256,
                            },
                          },
                        },
                        // urlPathHistory: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                      },
                    },
                  },
                },
                // source: {
                //   type: 'text',
                // },
                // sourceId: {
                //   type: 'text',
                // },
                // surname: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
                // updated: {
                //   type: 'date',
                //   ignore_malformed: true,
                // },
                // username: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
              },
            },
            // baseStory: {
            //   properties: {
            //     id: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     publication: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            // byline: {
            //   properties: {
            //     customByline: {
            //       type: 'text',
            //     },
            //     translator: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            // campaignSetting: {
            //   properties: {
            //     campaignDisplay: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     campaignType: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            // cookUrl: {
            //   type: 'text',
            //   fields: {
            //     keyword: {
            //       type: 'keyword',
            //       ignore_above: 256,
            //     },
            //   },
            // },
            // created: {
            //   type: 'date',
            //   store: true,
            //   format:
            //     'date_time||date_time_no_millis||date_hour_minute_second_millis',
            //   ignore_malformed: true,
            // },
            // creditInfo: {
            //   properties: {
            //     compiledBy: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     producer: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            // cueFields: {
            //   properties: {
            //     noDuplication: {
            //       type: 'boolean',
            //     },
            //   },
            // },
            // dashboard: {
            //   properties: {
            //     trelloCardId: {
            //       type: 'text',
            //     },
            //   },
            // },
            displaySetting: {
              properties: {
                // displayAssets: {
                //   type: 'text',
                // },
                displayAssetsMultiple: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                displayHeadline: {
                  type: 'text',
                },
                // displayHeadlineZBCom: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                displayType: {
                  type: 'text',
                },
                // englishHeadline: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                externalURL: {
                  type: 'text',
                },
                // hasAffiliateLabel: {
                //   type: 'boolean',
                // },
                hasUpdatedTimeDisplayed: {
                  type: 'boolean',
                },
                hideAuthorFlag: {
                  type: 'boolean',
                },
                // hideFromBreakingNewsListing: {
                //   type: 'boolean',
                // },
                // hideFromSectionListing: {
                //   type: 'boolean',
                // },
                // hideMedia: {
                //   type: 'boolean',
                // },
                // hideOutbrain: {
                //   type: 'boolean',
                // },
                // noDuplication: {
                //   type: 'boolean',
                // },
                // publishToGoogleAMP: {
                //   type: 'boolean',
                // },
                // showRelatedLinksAndNewsletterSignupForm: {
                //   type: 'boolean',
                // },
                // sticky: {
                //   type: 'boolean',
                // },
                zbcomFlag: {
                  type: 'boolean',
                },
                zbsgFlag: {
                  type: 'boolean',
                },
              },
            },
            // edited: {
            //   type: 'date',
            //   store: true,
            //   format:
            //     'date_time||date_time_no_millis||date_hour_minute_second_millis',
            //   ignore_malformed: true,
            // },
            elements: {
              type: 'nested',
              properties: {
                children: {
                  type: 'text',
                },
                fields: {
                  type: 'nested',
                  properties: {
                    annotations: {
                      type: 'nested',
                      properties: {
                        index: {
                          type: 'integer',
                        },
                        length: {
                          type: 'integer',
                          index: false,
                        },
                        name: {
                          type: 'text',
                        },
                        value: {
                          type: 'text',
                        },
                      },
                    },
                    booleanValue: {
                      type: 'boolean',
                    },
                    name: {
                      type: 'text',
                    },
                    value: {
                      type: 'text',
                      term_vector: 'with_positions_offsets',
                      analyzer: 'ik_smart',
                    },
                  },
                },
                id: {
                  type: 'keyword',
                },
                type: {
                  type: 'text',
                },
                relation: {
                  properties: {
                    // alternates: {
                    //   properties: {
                    //     BASE_FREE: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     BASE_LANDSCAPE: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     BASE_PORTRAIT: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     BASE_SQUARE: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     BASE_SQUARE_30_26: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     BASE_WIDE: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     ORIGINAL: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     com_escenic_master: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         height: {
                    //           type: 'long',
                    //         },
                    //         width: {
                    //           type: 'long',
                    //         },
                    //         x: {
                    //           type: 'long',
                    //         },
                    //         y: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //     poi: {
                    //       properties: {
                    //         auto: {
                    //           type: 'boolean',
                    //         },
                    //         left: {
                    //           type: 'long',
                    //         },
                    //         top: {
                    //           type: 'long',
                    //         },
                    //       },
                    //     },
                    //   },
                    // },
                    // binary: {
                    //   properties: {
                    //     filename: {
                    //       type: 'text',
                    //     },
                    //     url: {
                    //       type: 'text',
                    //     },
                    //   },
                    // },
                    // binaryLink: {
                    //   type: 'text',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    // },
                    // bucketName: {
                    //   type: 'text',
                    // },
                    fields: {
                      properties: {
                        // brightcoveId: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // byline: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // caption: {
                        //   type: 'text',
                        //   term_vector: 'with_positions_offsets',
                        //   analyzer: 'ik_smart',
                        // },
                        // com_escenic_defaultmetadata: {
                        //   type: 'nested',
                        //   properties: {
                        //     key: {
                        //       type: 'text',
                        //     },
                        //     value: {
                        //       type: 'text',
                        //     },
                        //   },
                        // },
                        // credit: {
                        //   type: 'text',
                        // },
                        // description: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // freecrop: {
                        //   properties: {
                        //     height: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //     url: {
                        //       type: 'text',
                        //     },
                        //     width: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //   },
                        // },
                        'freecrop-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // landscape: {
                        //   properties: {
                        //     height: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //     url: {
                        //       type: 'text',
                        //     },
                        //     width: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //   },
                        // },
                        'landscape-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // landscape1024: {
                        //   properties: {
                        //     height: {
                        //       type: 'long',
                        //     },
                        //     href_full: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     url: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     width: {
                        //       type: 'long',
                        //     },
                        //   },
                        // },
                        'landscape1024-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // landscape480: {
                        //   properties: {
                        //     height: {
                        //       type: 'long',
                        //     },
                        //     href_full: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     url: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     width: {
                        //       type: 'long',
                        //     },
                        //   },
                        // },
                        'landscape480-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // original: {
                        //   properties: {
                        //     height: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //     url: {
                        //       type: 'text',
                        //     },
                        //     width: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //   },
                        // },
                        'original-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // portrait: {
                        //   properties: {
                        //     height: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //     url: {
                        //       type: 'text',
                        //     },
                        //     width: {
                        //       type: 'integer',
                        //       index: false,
                        //     },
                        //   },
                        // },
                        'portrait-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // square: {
                        //   properties: {
                        //     height: {
                        //       type: 'long',
                        //     },
                        //     url: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     width: {
                        //       type: 'long',
                        //     },
                        //   },
                        // },
                        'square-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // square_30_26: {
                        //   properties: {
                        //     height: {
                        //       type: 'long',
                        //     },
                        //     url: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     width: {
                        //       type: 'long',
                        //     },
                        //   },
                        // },
                        'square_30_26-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // title: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // wide: {
                        //   properties: {
                        //     height: {
                        //       type: 'long',
                        //     },
                        //     url: {
                        //       type: 'text',
                        //       fields: {
                        //         keyword: {
                        //           type: 'keyword',
                        //           ignore_above: 256,
                        //         },
                        //       },
                        //     },
                        //     width: {
                        //       type: 'long',
                        //     },
                        //   },
                        // },
                        'wide-caas': {
                          properties: {
                            height: {
                              type: 'long',
                            },
                            url: {
                              type: 'text',
                              fields: {
                                keyword: {
                                  type: 'keyword',
                                  ignore_above: 256,
                                },
                              },
                            },
                            width: {
                              type: 'long',
                            },
                          },
                        },
                        // youtubeId: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                      },
                    },
                    // href: {
                    //   type: 'text',
                    // },
                    // id: {
                    //   type: 'keyword',
                    // },
                    linkFollow: {
                      properties: {
                        // alternates: {
                        //   properties: {
                        //     BASE_FREE: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     BASE_LANDSCAPE: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     BASE_PORTRAIT: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     BASE_SQUARE: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     BASE_SQUARE_30_26: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     BASE_WIDE: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     ORIGINAL: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     com_escenic_master: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         height: {
                        //           type: 'long',
                        //         },
                        //         width: {
                        //           type: 'long',
                        //         },
                        //         x: {
                        //           type: 'long',
                        //         },
                        //         y: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //     poi: {
                        //       properties: {
                        //         auto: {
                        //           type: 'boolean',
                        //         },
                        //         left: {
                        //           type: 'long',
                        //         },
                        //         top: {
                        //           type: 'long',
                        //         },
                        //       },
                        //     },
                        //   },
                        // },
                        // binaryLink: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        fields: {
                          properties: {
                            // caption: {
                            //   type: 'text',
                            //   fields: {
                            //     keyword: {
                            //       type: 'keyword',
                            //       ignore_above: 256,
                            //     },
                            //   },
                            // },
                            // com_escenic_defaultmetadata: {
                            //   properties: {
                            //     key: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     value: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //   },
                            // },
                            // credit: {
                            //   type: 'text',
                            //   fields: {
                            //     keyword: {
                            //       type: 'keyword',
                            //       ignore_above: 256,
                            //     },
                            //   },
                            // },
                            // freecrop: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            // 'freecrop-caas': {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            // landscape: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'landscape-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // landscape1024: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     href_full: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'landscape1024-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // landscape480: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     href_full: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'landscape480-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // original: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'original-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // portrait: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'portrait-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // square: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'square-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // square_30_26: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'square_30_26-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                            // wide: {
                            //   properties: {
                            //     height: {
                            //       type: 'long',
                            //     },
                            //     url: {
                            //       type: 'text',
                            //       fields: {
                            //         keyword: {
                            //           type: 'keyword',
                            //           ignore_above: 256,
                            //         },
                            //       },
                            //     },
                            //     width: {
                            //       type: 'long',
                            //     },
                            //   },
                            // },
                            'wide-caas': {
                              properties: {
                                height: {
                                  type: 'long',
                                },
                                url: {
                                  type: 'text',
                                  fields: {
                                    keyword: {
                                      type: 'keyword',
                                      ignore_above: 256,
                                    },
                                  },
                                },
                                width: {
                                  type: 'long',
                                },
                              },
                            },
                          },
                        },
                        // id: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // source: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // sourceId: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                        // type: {
                        //   type: 'text',
                        //   fields: {
                        //     keyword: {
                        //       type: 'keyword',
                        //       ignore_above: 256,
                        //     },
                        //   },
                        // },
                      },
                    },
                    // published: {
                    //   type: 'date',
                    //   store: true,
                    //   format:
                    //     'date_time||date_time_no_millis||date_hour_minute_second_millis',
                    //   ignore_malformed: true,
                    // },
                    // source: {
                    //   type: 'text',
                    // },
                    // sourceId: {
                    //   type: 'text',
                    // },
                    title: {
                      type: 'text',
                      term_vector: 'with_positions_offsets',
                      analyzer: 'ik_smart',
                    },
                    // type: {
                    //   type: 'text',
                    // },
                    // urlPath: {
                    //   type: 'text',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    // },
                  },
                },
              },
            },
            embedcodes: {
              type: 'nested',
              properties: {
                html: {
                  type: 'text',
                },
                id: {
                  type: 'keyword',
                },
              },
            },
            // expired: {
            //   type: 'text',
            // },
            // href: {
            //   type: 'text',
            // },
            id: {
              type: 'keyword',
            },
            // lastmodified: {
            //   type: 'date',
            //   ignore_malformed: true,
            // },
            // media: {
            //   properties: {
            //     content: {
            //       properties: {
            //         alternates: {
            //           properties: {
            //             BASE_FREE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             BASE_LANDSCAPE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             BASE_PORTRAIT: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             BASE_SQUARE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             BASE_SQUARE_30_26: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             BASE_WIDE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             ORIGINAL: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             com_escenic_master: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //                 x: {
            //                   type: 'long',
            //                 },
            //                 y: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             poi: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 left: {
            //                   type: 'long',
            //                 },
            //                 top: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         binaryLink: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         fields: {
            //           properties: {
            //             caption: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             com_escenic_defaultmetadata: {
            //               properties: {
            //                 key: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 value: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //               },
            //             },
            //             credit: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             freecrop: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'freecrop-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             landscape: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'landscape-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             landscape1024: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 href_full: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'landscape1024-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             landscape480: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 href_full: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'landscape480-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             original: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'original-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             portrait: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'portrait-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             square: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'square-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             square_30_26: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'square_30_26-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             wide: {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             'wide-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         id: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         source: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         sourceId: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         type: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //       },
            //     },
            //     href: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     summary: {
            //       properties: {
            //         key: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         value: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //       },
            //     },
            //   },
            // },
            ogFields: {
              properties: {
                ogDescription: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                ogTitle: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
              },
            },
            others: {
              properties: {
                authoring: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                // customUrlAlias: {
                //   type: 'boolean',
                // },
                // editorialTag: {
                //   type: 'text',
                // },
                removeAuthor: {
                  type: 'boolean',
                },
                // storySource: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // storySourceMetadata: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // storyThread: {
                //   type: 'text',
                // },
                // storyThreadMetadata: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // urlAlias: {
                //   type: 'text',
                // },
                // urlHistory: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
              },
            },
            paywall: {
              properties: {
                // agencySource: {
                //   type: 'text',
                // },
                // automateFlag: {
                //   type: 'boolean',
                // },
                contentAccess: {
                  type: 'text',
                },
                copyright: {
                  type: 'text',
                },
                printFlag: {
                  type: 'boolean',
                },
              },
            },
            // previewSourceId: {
            //   type: 'text',
            // },
            published: {
              type: 'date',
              ignore_malformed: true,
            },
            // relatedContributorProfile: {
            //   type: 'nested',
            //   properties: {
            //     content: {
            //       properties: {
            //         edited: {
            //           type: 'date',
            //           store: true,
            //           format:
            //             'date_time||date_time_no_millis||date_hour_minute_second_millis',
            //           ignore_malformed: true,
            //         },
            //         fields: {
            //           properties: {
            //             bio: {
            //               properties: {
            //                 children: {
            //                   properties: {
            //                     text: {
            //                       type: 'text',
            //                       fields: {
            //                         keyword: {
            //                           type: 'keyword',
            //                           ignore_above: 256,
            //                         },
            //                       },
            //                     },
            //                     type: {
            //                       type: 'text',
            //                       fields: {
            //                         keyword: {
            //                           type: 'keyword',
            //                           ignore_above: 256,
            //                         },
            //                       },
            //                     },
            //                   },
            //                 },
            //                 type: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //               },
            //             },
            //             bio_raw: {
            //               type: 'text',
            //             },
            //             designation: {
            //               type: 'text',
            //             },
            //             email: {
            //               type: 'text',
            //             },
            //             name: {
            //               type: 'text',
            //             },
            //             startdate: {
            //               type: 'date',
            //               store: true,
            //               format:
            //                 'date_time||date_time_no_millis||date_hour_minute_second_millis',
            //               ignore_malformed: true,
            //             },
            //             twitterHandle: {
            //               type: 'text',
            //             },
            //           },
            //         },
            //         headshotImage: {
            //           properties: {
            //             content: {
            //               properties: {
            //                 fields: {
            //                   properties: {
            //                     square: {
            //                       properties: {
            //                         height: {
            //                           type: 'integer',
            //                           index: false,
            //                         },
            //                         url: {
            //                           type: 'text',
            //                         },
            //                         width: {
            //                           type: 'integer',
            //                           index: false,
            //                         },
            //                       },
            //                     },
            //                   },
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         id: {
            //           type: 'keyword',
            //         },
            //         source: {
            //           type: 'text',
            //         },
            //         sourceId: {
            //           type: 'text',
            //         },
            //         updated: {
            //           type: 'date',
            //           store: true,
            //           format:
            //             'date_time||date_time_no_millis||date_hour_minute_second_millis',
            //           ignore_malformed: true,
            //         },
            //       },
            //     },
            //     href: {
            //       type: 'text',
            //     },
            //   },
            // },
            // relatedMedia: {
            //   type: 'nested',
            //   properties: {
            //     content: {
            //       properties: {
            //         alternates: {
            //           properties: {
            //             BASE_FREE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             BASE_LANDSCAPE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             BASE_PORTRAIT: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             BASE_SQUARE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             BASE_WIDE: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             ORIGINAL: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             com_escenic_master: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 height: {
            //                   type: 'integer',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                 },
            //                 x: {
            //                   type: 'integer',
            //                 },
            //                 y: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //             poi: {
            //               properties: {
            //                 auto: {
            //                   type: 'boolean',
            //                 },
            //                 left: {
            //                   type: 'integer',
            //                 },
            //                 top: {
            //                   type: 'integer',
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         binary: {
            //           properties: {
            //             filename: {
            //               type: 'text',
            //             },
            //             href: {
            //               type: 'text',
            //             },
            //           },
            //         },
            //         binaryLink: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         fields: {
            //           properties: {
            //             brightcoveId: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             caption: {
            //               type: 'text',
            //               term_vector: 'with_positions_offsets',
            //               analyzer: 'text_analyzer',
            //               search_analyzer: 'phrase_analyzer',
            //             },
            //             category: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             com_escenic_defaultmetadata: {
            //               type: 'nested',
            //               properties: {
            //                 key: {
            //                   type: 'text',
            //                 },
            //                 value: {
            //                   type: 'text',
            //                 },
            //               },
            //             },
            //             created: {
            //               type: 'date',
            //               ignore_malformed: true,
            //             },
            //             credit: {
            //               type: 'text',
            //             },
            //             description: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             duration: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             freecrop: {
            //               properties: {
            //                 height: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //                 url: {
            //                   type: 'text',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //               },
            //             },
            //             'freecrop-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             height: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             landscape: {
            //               properties: {
            //                 height: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //                 url: {
            //                   type: 'text',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //               },
            //             },
            //             'landscape-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             original: {
            //               properties: {
            //                 height: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //                 url: {
            //                   type: 'text',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //               },
            //             },
            //             'original-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             portrait: {
            //               properties: {
            //                 height: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //                 url: {
            //                   type: 'text',
            //                 },
            //                 width: {
            //                   type: 'integer',
            //                   index: false,
            //                 },
            //               },
            //             },
            //             'portrait-caas': {
            //               properties: {
            //                 height: {
            //                   type: 'long',
            //                 },
            //                 url: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 width: {
            //                   type: 'long',
            //                 },
            //               },
            //             },
            //             title: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //             width: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         href: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         id: {
            //           type: 'keyword',
            //         },
            //         poster: {
            //           properties: {
            //             content: {
            //               properties: {
            //                 fields: {
            //                   properties: {
            //                     landscape: {
            //                       properties: {
            //                         height: {
            //                           type: 'long',
            //                         },
            //                         url: {
            //                           type: 'text',
            //                           fields: {
            //                             keyword: {
            //                               type: 'keyword',
            //                               ignore_above: 256,
            //                             },
            //                           },
            //                         },
            //                         width: {
            //                           type: 'long',
            //                         },
            //                       },
            //                     },
            //                   },
            //                 },
            //                 href: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //                 id: {
            //                   type: 'text',
            //                   fields: {
            //                     keyword: {
            //                       type: 'keyword',
            //                       ignore_above: 256,
            //                     },
            //                   },
            //                 },
            //               },
            //             },
            //             href: {
            //               type: 'text',
            //               fields: {
            //                 keyword: {
            //                   type: 'keyword',
            //                   ignore_above: 256,
            //                 },
            //               },
            //             },
            //           },
            //         },
            //         source: {
            //           type: 'text',
            //         },
            //         sourceId: {
            //           type: 'text',
            //         },
            //         type: {
            //           type: 'text',
            //         },
            //       },
            //     },
            //     href: {
            //       type: 'text',
            //     },
            //     summary: {
            //       properties: {
            //         key: {
            //           type: 'text',
            //         },
            //         value: {
            //           type: 'text',
            //           term_vector: 'with_positions_offsets',
            //           analyzer: 'text_analyzer',
            //           search_analyzer: 'phrase_analyzer',
            //         },
            //       },
            //     },
            //   },
            // },
            relatedStories: {
              type: 'nested',
              properties: {
                content: {
                  properties: {
                    // fields: {
                    //   properties: {
                    //     title: {
                    //       type: 'text',
                    //       term_vector: 'with_positions_offsets',
                    //       analyzer: 'text_analyzer',
                    //       search_analyzer: 'phrase_analyzer',
                    //       similarity: 'BM25',
                    //     },
                    //   },
                    // },
                    // href: {
                    //   type: 'text',
                    // },
                    id: {
                      type: 'keyword',
                    },
                    // source: {
                    //   type: 'text',
                    // },
                    // sourceId: {
                    //   type: 'text',
                    // },
                    // type: {
                    //   type: 'text',
                    // },
                    // urlPath: {
                    //   type: 'text',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    // },
                  },
                },
                // href: {
                //   type: 'keyword',
                // },
              },
            },
            // scheduled: {
            //   type: 'text',
            // },
            sections: {
              type: 'nested',
              properties: {
                // directoryName: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // href: {
                //   type: 'text',
                // },
                // name: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
                // parameters: {
                //   properties: {
                //     key: {
                //       type: 'text',
                //     },
                //     value: {
                //       type: 'text',
                //     },
                //   },
                // },
                // parent: {
                //   properties: {
                //     directoryName: {
                //       type: 'text',
                //     },
                //     name: {
                //       type: 'text',
                //       fields: {
                //         keyword: {
                //           type: 'keyword',
                //           ignore_above: 256,
                //         },
                //       },
                //       term_vector: 'with_positions_offsets',
                //       analyzer: 'autocomplete',
                //       search_analyzer: 'autocomplete_search',
                //       similarity: 'BM25',
                //     },
                //     parent: {
                //       properties: {
                //         directoryName: {
                //           type: 'text',
                //           fields: {
                //             keyword: {
                //               type: 'keyword',
                //               ignore_above: 256,
                //             },
                //           },
                //         },
                //         name: {
                //           type: 'text',
                //           fields: {
                //             keyword: {
                //               type: 'keyword',
                //               ignore_above: 256,
                //             },
                //           },
                //         },
                //         uniqueName: {
                //           type: 'text',
                //           fields: {
                //             keyword: {
                //               type: 'keyword',
                //               ignore_above: 256,
                //             },
                //           },
                //         },
                //       },
                //     },
                //     uniqueName: {
                //       type: 'text',
                //       term_vector: 'with_positions_offsets',
                //       analyzer: 'autocomplete',
                //       search_analyzer: 'autocomplete_search',
                //       similarity: 'BM25',
                //     },
                //   },
                // },
                uniqueName: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                  term_vector: 'with_positions_offsets',
                  analyzer: 'autocomplete',
                  search_analyzer: 'autocomplete_search',
                  similarity: 'BM25',
                },
              },
            },
            seoFields: {
              properties: {
                canonicalUrl: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                metaDescription: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                metaRobots: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                metaTitle: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                // yoastMeta: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
              },
            },
            // source: {
            //   type: 'text',
            // },
            // sourceId: {
            //   type: 'text',
            // },
            // sponsorship: {
            //   properties: {
            //     sponsorCheckbox: {
            //       type: 'boolean',
            //     },
            //     sponsorDateEnd: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     sponsorDateStart: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //     sponsorName: {
            //       type: 'text',
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            storyContent: {
              properties: {
                blurb: {
                  type: 'text',
                },
                // shortURL: {
                //   type: 'text',
                // },
                // stockCode: {
                //   type: 'text',
                // },
              },
            },
            storyline: {
              type: 'text',
            },
            tags: {
              type: 'nested',
              properties: {
                // aliases: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                // description: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                fields: {
                  properties: {
                    key: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                    value: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                  },
                },
                id: {
                  type: 'keyword',
                },
                name: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                  term_vector: 'with_positions_offsets',
                  analyzer: 'ik_smart',
                },
                parent: {
                  type: 'nested',
                  properties: {
                    aliases: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                    description: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                    fields: {
                      properties: {
                        key: {
                          type: 'text',
                          fields: {
                            keyword: {
                              type: 'keyword',
                              ignore_above: 256,
                            },
                          },
                        },
                        value: {
                          type: 'text',
                          fields: {
                            keyword: {
                              type: 'keyword',
                              ignore_above: 256,
                            },
                          },
                        },
                      },
                    },
                    id: {
                      type: 'keyword',
                    },
                    name: {
                      type: 'text',
                    },
                    // parent: {
                    //   type: 'nested',
                    //   properties: {
                    //     aliases: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //     description: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //     fields: {
                    //       properties: {
                    //         key: {
                    //           type: 'text',
                    //           fields: {
                    //             keyword: {
                    //               type: 'keyword',
                    //               ignore_above: 256,
                    //             },
                    //           },
                    //         },
                    //         value: {
                    //           type: 'text',
                    //           fields: {
                    //             keyword: {
                    //               type: 'keyword',
                    //               ignore_above: 256,
                    //             },
                    //           },
                    //         },
                    //       },
                    //     },
                    //     id: {
                    //       type: 'keyword',
                    //     },
                    //     name: {
                    //       type: 'text',
                    //     },
                    //     type: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //     urlPath: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //   },
                    // },
                    type: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                    urlPath: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                    // urlPathHistory: {
                    //   type: 'text',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    // },
                  },
                },
                type: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                // uri: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                // },
                urlPath: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                urlPathHistory: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
              },
            },
            title: {
              type: 'text',
              term_vector: 'with_positions_offsets',
              analyzer: 'ik_smart',
            },
            type: {
              type: 'text',
            },
            // typeName: {
            //   type: 'text',
            // },
            updated: {
              type: 'date',
              store: true,
              format:
                'date_time||date_time_no_millis||date_hour_minute_second_millis',
              ignore_malformed: true,
            },
            urlPath: {
              type: 'keyword',
            },
            urlPathHistory: {
              type: 'keyword',
            },
          },
        },
        // footerMenuESI: {
        //   type: 'text',
        // },
        // headerMenuESI: {
        //   type: 'text',
        // },
        // mostReadArticlesESI: {
        //   type: 'text',
        // },
        resolution: {
          properties: {
            // context: {
            //   type: 'text',
            // },
            // publication: {
            //   properties: {
            //     features: {
            //       type: 'nested',
            //       properties: {
            //         key: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //         value: {
            //           type: 'text',
            //           fields: {
            //             keyword: {
            //               type: 'keyword',
            //               ignore_above: 256,
            //             },
            //           },
            //         },
            //       },
            //     },
            //     href: {
            //       type: 'text',
            //     },
            //     name: {
            //       type: 'text',
            //       store: true,
            //       fields: {
            //         keyword: {
            //           type: 'keyword',
            //           ignore_above: 256,
            //         },
            //       },
            //     },
            //   },
            // },
            // remainingPath: {
            //   type: 'text',
            // },
            section: {
              properties: {
                // directoryName: {
                //   type: 'text',
                // },
                // href: {
                //   type: 'text',
                // },
                // name: {
                //   type: 'text',
                //   fields: {
                //     keyword: {
                //       type: 'keyword',
                //       ignore_above: 256,
                //     },
                //   },
                //   term_vector: 'with_positions_offsets',
                //   analyzer: 'autocomplete',
                //   search_analyzer: 'autocomplete_search',
                //   similarity: 'BM25',
                // },
                // parameters: {
                //   type: 'text',
                // },
                parent: {
                  properties: {
                    // directoryName: {
                    //   type: 'keyword',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    // },
                    // name: {
                    //   type: 'text',
                    //   fields: {
                    //     keyword: {
                    //       type: 'keyword',
                    //       ignore_above: 256,
                    //     },
                    //   },
                    //   term_vector: 'with_positions_offsets',
                    //   analyzer: 'autocomplete',
                    //   search_analyzer: 'autocomplete_search',
                    //   similarity: 'BM25',
                    // },
                    // parent: {
                    //   properties: {
                    //     directoryName: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //     name: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //     uniqueName: {
                    //       type: 'text',
                    //       fields: {
                    //         keyword: {
                    //           type: 'keyword',
                    //           ignore_above: 256,
                    //         },
                    //       },
                    //     },
                    //   },
                    // },
                    uniqueName: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                      term_vector: 'with_positions_offsets',
                      analyzer: 'autocomplete',
                      search_analyzer: 'autocomplete_search',
                      similarity: 'BM25',
                    },
                  },
                },
                uniqueName: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                  term_vector: 'with_positions_offsets',
                  analyzer: 'autocomplete',
                  search_analyzer: 'autocomplete_search',
                  similarity: 'BM25',
                },
              },
            },
          },
        },
      },
    },
    //     published: {
    //       type: 'text',
    //       fields: {
    //         keyword: {
    //           type: 'keyword',
    //           ignore_above: 256,
    //         },
    //       },
    //     },
    //     sqsMessage: {
    //       properties: {
    //         authors: {
    //           type: 'text',
    //           fields: {
    //             raw: {
    //               type: 'keyword',
    //             },
    //           },
    //           fielddata: true,
    //         },
    //         cookUrl: {
    //           type: 'text',
    //           fields: {
    //             keyword: {
    //               type: 'keyword',
    //               ignore_above: 256,
    //             },
    //           },
    //         },
    //         homeSection: {
    //           type: 'text',
    //         },
    //         homeSectionName: {
    //           type: 'text',
    //           fields: {
    //             keyword: {
    //               type: 'keyword',
    //               ignore_above: 256,
    //             },
    //           },
    //         },
    //         homeSectionUrl: {
    //           type: 'text',
    //         },
    //         id: {
    //           type: 'keyword',
    //         },
    //         operator: {
    //           type: 'text',
    //         },
    //         publication: {
    //           type: 'text',
    //         },
    //         source: {
    //           type: 'text',
    //         },
    //         sourceId: {
    //           type: 'text',
    //         },
    //         state: {
    //           type: 'text',
    //         },
    //         title: {
    //           type: 'text',
    //         },
    //         type: {
    //           type: 'text',
    //         },
    //         url: {
    //           type: 'text',
    //         },
    //       },
    //     },
  },
}

export default mapping
