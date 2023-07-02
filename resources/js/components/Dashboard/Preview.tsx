import React from 'react'
import { styled } from 'styled-system/jsx'
import { PageFormType } from '../../Pages/Dashboard'

export type SidePreviewProps = Omit<PageFormType, 'isOnLink'>

export const SidePreview: React.FC<SidePreviewProps> = (props) => {
  return (
    <styled.section
      gridRow="2 / -1"
      gridColumn="1 / 2"
      p="1.5rem"
      bg="white"
      display="grid"
      placeContent="center"
    >
      <svg
        width="308"
        height="632"
        viewBox="0 0 308 632"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5C1 24.9528 24.9528 1 54.5 1Z"
          stroke="#737373"
        />
        <path
          d="M12 55.5C12 30.9233 31.9233 11 56.5 11H80.5C86.8513 11 92 16.1487 92 22.5C92 30.5081 98.4919 37 106.5 37H201.5C209.508 37 216 30.5081 216 22.5C216 16.1487 221.149 11 227.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
          fill="white"
          stroke="#737373"
        />

        {props.avatar && (
          <defs>
            <pattern id="avatar" x="0" y="0" height="1" width="1">
              <image x="0" y="0" height="100" width="100" xlinkHref={props.avatar}></image>
            </pattern>
          </defs>
        )}
        <circle
          cx="153.5"
          cy="112"
          r="48"
          fill={props.avatar ? 'url(#avatar)' : '#EEEEEE'}
        ></circle>

        {!props.profile.first && !props.profile.last ? (
          <rect x="73.5" y="185" width="160" height="16" rx="8" fill="#EEEEEE" />
        ) : (
          <foreignObject x="0" y="185" width="100%" height="32" rx="4">
            <styled.p textStyle="heading.s" textAlign="center" color="grey.default">
              {props.profile.first} {props.profile.last}
            </styled.p>
          </foreignObject>
        )}

        {!props.profile.email ? (
          <rect x="117.5" y="214" width="72" height="8" rx="4" fill="#EEEEEE" />
        ) : (
          <foreignObject x="0" y="214" width="100%" height="16" rx="4">
            <styled.p textStyle="body.s" textAlign="center" color="grey.normal">
              {props.profile.email}
            </styled.p>
          </foreignObject>
        )}

        <rect x="35" y="278" width="237" height="44" rx="8" fill="#EEEEEE" />
        <rect x="35" y="342" width="237" height="44" rx="8" fill="#EEEEEE" />
        <rect x="35" y="406" width="237" height="44" rx="8" fill="#EEEEEE" />
        <rect x="35" y="470" width="237" height="44" rx="8" fill="#EEEEEE" />
        <rect x="35" y="534" width="237" height="44" rx="8" fill="#EEEEEE" />
      </svg>
    </styled.section>
  )
}
